<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { fetchTopPlayers, sendUserVerificationRequest } from '../utils'
import RankingScoreTable from './RankingScoreTable.vue'

const emit = defineEmits(['changeMode'])

/* Object refs */
const nickname = ref(null)
const tutorialMode = ref(false)
const pause = ref(true)
const gameOver = ref(false)
const started = ref(false)
const loading = ref(false)
const score = ref(0)
const topPlayers = ref([])

const colors = [
  null,
  '#FF0D72',
  '#0DC2FF',
  '#0DFF72',
  '#F538FF',
  '#FF8E0D',
  '#FFE138',
  '#3877FF'
]

const createMatrix = (w, h) => {
  const matrix = []
  while (h--) {
    matrix.push(new Array(w).fill(0))
  }
  return matrix
}

const createPiece = (type) => {
  if (type === 'T') {
    return [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ]
  } else if (type === 'O') {
    return [
      [2, 2],
      [2, 2]
    ]
  } else if (type === 'L') {
    return [
      [0, 3, 0],
      [0, 3, 0],
      [0, 3, 3]
    ]
  } else if (type === 'J') {
    return [
      [0, 4, 0],
      [0, 4, 0],
      [4, 4, 0]
    ]
  } else if (type === 'I') {
    return [
      [0, 5, 0, 0],
      [0, 5, 0, 0],
      [0, 5, 0, 0],
      [0, 5, 0, 0]
    ]
  } else if (type === 'S') {
    return [
      [0, 6, 6],
      [6, 6, 0],
      [0, 0, 0]
    ]
  } else if (type === 'Z') {
    return [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0]
    ]
  }
}

let canvas = null
let ctx = null
let dropCounter = 0
let dropInterval = 1000
let lastTime = 0
let animationId = null

const drawMatrix = (matrix, offset) => {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = colors[value]
        ctx.fillRect(x + offset.x, y + offset.y, 1, 1)
      }
    })
  })
}

const draw = () => {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  drawMatrix(arena, { x: 0, y: 0 })
  drawMatrix(player.matrix, player.pos)
}

const merge = (arena, player) => {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value
      }
    })
  })
}

const collide = (arena, player) => {
  const [m, o] = [player.matrix, player.pos]
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 &&
        (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
        return true
      }
    }
  }
  return false
}

const playerDrop = () => {
  player.pos.y++
  if (collide(arena, player)) {
    player.pos.y--
    merge(arena, player)
    playerReset()
    arenaSweep()
  }
  dropCounter = 0
}

const playerMove = (dir) => {
  player.pos.x += dir
  if (collide(arena, player)) {
    player.pos.x -= dir
  }
}

const playerReset = () => {
  const pieces = 'ILJOTSZ'
  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0])
  player.pos.y = 0
  player.pos.x = (arena[0].length / 2 | 0) -
    (player.matrix[0].length / 2 | 0)
  if (collide(arena, player)) {
    gameOver.value = true
    pause.value = true
  }
}

const playerRotate = (dir) => {
  const pos = player.pos.x
  let offset = 1
  rotate(player.matrix, dir)
  while (collide(arena, player)) {
    player.pos.x += offset
    offset = -(offset + (offset > 0 ? 1 : -1))
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir)
      player.pos.x = pos
      return
    }
  }
}

const rotate = (matrix, dir) => {
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [
        matrix[x][y],
        matrix[y][x]
      ] = [
        matrix[y][x],
        matrix[x][y]
      ]
    }
  }
  if (dir > 0) {
    matrix.forEach(row => row.reverse())
  } else {
    matrix.reverse()
  }
}

const arenaSweep = () => {
  let rowCount = 1
  outer: for (let y = arena.length - 1; y >= 0; --y) {
    for (let x = 0; x < arena[y].length; ++x) {
      if (arena[y][x] === 0) {
        continue outer
      }
    }
    const row = arena.splice(y, 1)[0].fill(0)
    arena.unshift(row)
    ++y
    score.value += rowCount * 10
    rowCount *= 2
  }
}

let arena = createMatrix(10, 20)
const player = {
  pos: { x: 0, y: 0 },
  matrix: null
}

const update = (time = 0) => {
  if (pause.value || gameOver.value) return
  const deltaTime = time - lastTime
  lastTime = time
  dropCounter += deltaTime
  if (dropCounter > dropInterval) {
    playerDrop()
  }
  draw()
  animationId = requestAnimationFrame(update)
}

const commandsKey = (event) => {
  if (started.value) {
    let k = event.key
    if (!pause.value && !gameOver.value) {
      if (k === 'ArrowLeft' || k === 'q') playerMove(-1)
      else if (k === 'ArrowRight' || k === 'd') playerMove(1)
      else if (k === 'ArrowDown' || k === 's') playerDrop()
      else if (k === 'ArrowUp' || k === 'z') {
        event.preventDefault()
        playerRotate(1)
      }
    }
    if (k === 'p' && !tutorialMode.value) {
      pause.value = !pause.value
      if (!pause.value) {
        update()
      }
    }
  }
}

const play = () => {
  started.value = true
  pause.value = false
  playerReset()
  update()
}

const restart = () => {
  gameOver.value = false
  score.value = 0
  arena = createMatrix(10, 20)
  play()
}

onMounted(() => {
  document.addEventListener('keydown', commandsKey)
  canvas = document.getElementById('tetris-canvas')
  ctx = canvas.getContext('2d')
  ctx.scale(20, 20)
})

watch(gameOver, async (isGameOver) => {
  if (isGameOver) {
    cancelAnimationFrame(animationId)
    try {
      loading.value = true
      await sendUserVerificationRequest({ nickname: nickname.value, score: score.value, game: 'tetris' })
      const topPlayersResponse = await fetchTopPlayers({ game: 'tetris', limit: 10 })
      if (topPlayersResponse) topPlayers.value = topPlayersResponse
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', commandsKey)
  cancelAnimationFrame(animationId)
})
</script>

<template>
  <div class="centered flex-col gap-y-4" v-if="!started">
    <input class="bg-transparent text-xl text-amber-500 py-4 px-8 outline-0 border border-amber-500 rounded-lg"
      type="text"
      v-model="nickname"
      placeholder="Enter your Nickname!" />
    <button v-show="nickname" class="btn-lg btn-amber" @click="play">Play Now!</button>
  </div>
  <div v-show="!gameOver && started">
    <div class="text-center" v-if="!tutorialMode">
      <p class="text-2xl">Score : {{ score }}</p>
      <p class="text-amber-500" v-show="pause">PAUSE, press "P" to start!</p>
    </div>
    <div class="m-2" v-else>
      <p>To rotate press "Arrow Up" or "Z".</p>
      <p>To drop faster press "Arrow Down" or "S".</p>
      <p>To move Right press "Arrow Right" or "D".</p>
      <p>To move left press "Arrow Left" or "Q".</p>
      <p>Press "P" to pause the game.</p>
    </div>
    <div v-show="!tutorialMode" class="centered">
      <canvas id="tetris-canvas" width="200" height="400"></canvas>
    </div>
    <div class="centered gap-x-4">
      <button v-if="!tutorialMode" class="btn btn-amber" @click="pause = !pause; if(!pause) update()">
        {{ (pause) ? 'START' : 'PAUSE' }}
      </button>
      <button v-if="pause" class="btn btn-amber" @click="tutorialMode = !tutorialMode">
        {{ (tutorialMode) ? 'Exit Tutorial' : 'Show Tutorial' }}
      </button>
      <button v-if="pause" class="btn btn-red" @click="emit('changeMode', false)">
        Exit game
      </button>
    </div>
  </div>
  <div v-if="gameOver">
    <p class="text-2xl text-center">Game Over! Your score : {{ score }} point(s)</p>
    <div class="centered mt-4">
      <button class="btn-lg btn-amber" @click="restart">Play again!</button>
    </div>
    <RankingScoreTable :loading="loading" :topPlayers="topPlayers" />
  </div>
</template>

<style scoped>
#tetris-canvas {
  @apply border-8 border-double border-amber-500 mb-4 mt-4 bg-black;
  width: 200px;
  height: 400px;
}
</style>
