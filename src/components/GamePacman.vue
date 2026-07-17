<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { fetchTopPlayers, sendUserVerificationRequest } from '../utils'
import RankingScoreTable from './RankingScoreTable.vue'

const emit = defineEmits(['changeMode'])

const nickname = ref(null)
const tutorialMode = ref(false)
const pause = ref(true)
const gameOver = ref(false)
const gameWon = ref(false)
const started = ref(false)
const loading = ref(false)
const score = ref(0)
const topPlayers = ref([])

let canvas = null
let ctx = null
let animationId = null

const tileSize = 20

// 0: dot, 1: wall, 2: power, 3: empty
const initialMap = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,2,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,2,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,3,1,3,1,1,1,0,1,1,1,1],
  [3,3,3,1,0,1,3,3,3,3,3,3,3,1,0,1,3,3,3],
  [1,1,1,1,0,1,3,1,1,3,1,1,3,1,0,1,1,1,1],
  [3,3,3,3,0,3,3,1,3,3,3,1,3,3,0,3,3,3,3],
  [1,1,1,1,0,1,3,1,1,1,1,1,3,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
  [1,2,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,2,1],
  [1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

let map = []
let pacman = { r: 11, c: 9, dir: { r: 0, c: 0 }, nextDir: { r: 0, c: 0 } }
let ghosts = [
  { r: 9, c: 8, color: 'red', dir: { r: 0, c: 1 } },
  { r: 9, c: 9, color: 'pink', dir: { r: -1, c: 0 } },
  { r: 9, c: 10, color: 'cyan', dir: { r: 0, c: -1 } }
]
let dotsLeft = 0
let lastTime = 0
let moveInterval = 150
let moveCounter = 0

const initializeGame = () => {
  map = initialMap.map(row => [...row])
  dotsLeft = 0
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      if (map[r][c] === 0 || map[r][c] === 2) dotsLeft++
    }
  }
  pacman = { r: 11, c: 9, dir: { r: 0, c: 0 }, nextDir: { r: 0, c: 0 } }
  ghosts = [
    { r: 9, c: 8, color: 'red', dir: { r: 0, c: 1 } },
    { r: 9, c: 9, color: 'pink', dir: { r: -1, c: 0 } },
    { r: 9, c: 10, color: 'cyan', dir: { r: 0, c: -1 } }
  ]
  score.value = 0
  gameOver.value = false
  gameWon.value = false
  pause.value = false
}

const drawMap = () => {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      if (map[r][c] === 1) {
        ctx.fillStyle = '#1919A6'
        ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize)
      } else if (map[r][c] === 0) {
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(c * tileSize + tileSize / 2, r * tileSize + tileSize / 2, 3, 0, Math.PI * 2)
        ctx.fill()
      } else if (map[r][c] === 2) {
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(c * tileSize + tileSize / 2, r * tileSize + tileSize / 2, 6, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }
}

const drawPacman = () => {
  ctx.fillStyle = 'yellow'
  ctx.beginPath()
  let angleOffset = 0
  if (pacman.dir.c === 1) angleOffset = 0
  else if (pacman.dir.c === -1) angleOffset = Math.PI
  else if (pacman.dir.r === 1) angleOffset = Math.PI / 2
  else if (pacman.dir.r === -1) angleOffset = -Math.PI / 2
  ctx.arc(pacman.c * tileSize + tileSize / 2, pacman.r * tileSize + tileSize / 2, tileSize / 2 - 2, 0.2 * Math.PI + angleOffset, 1.8 * Math.PI + angleOffset)
  ctx.lineTo(pacman.c * tileSize + tileSize / 2, pacman.r * tileSize + tileSize / 2)
  ctx.fill()
}

const drawGhosts = () => {
  ghosts.forEach(g => {
    ctx.fillStyle = g.color
    ctx.beginPath()
    ctx.arc(g.c * tileSize + tileSize / 2, g.r * tileSize + tileSize / 2, tileSize / 2 - 2, Math.PI, 0)
    ctx.lineTo(g.c * tileSize + tileSize - 2, g.r * tileSize + tileSize - 2)
    ctx.lineTo(g.c * tileSize + tileSize / 2, g.r * tileSize + tileSize / 2)
    ctx.lineTo(g.c * tileSize + 2, g.r * tileSize + tileSize - 2)
    ctx.fill()
  })
}

const getValidDirs = (r, c) => {
  const dirs = [{r:-1,c:0}, {r:1,c:0}, {r:0,c:-1}, {r:0,c:1}]
  return dirs.filter(d => {
    let nr = r + d.r, nc = c + d.c
    if (nc < 0) nc = map[0].length - 1
    if (nc >= map[0].length) nc = 0
    return map[nr] && map[nr][nc] !== 1
  })
}

const updateGame = (time = 0) => {
  if (pause.value || gameOver.value || gameWon.value) return
  const deltaTime = time - lastTime
  lastTime = time
  moveCounter += deltaTime

  if (moveCounter > moveInterval) {
    moveCounter = 0
    // Try to apply nextDir
    if (pacman.nextDir.r !== 0 || pacman.nextDir.c !== 0) {
      let nr = pacman.r + pacman.nextDir.r
      let nc = pacman.c + pacman.nextDir.c
      if (nc < 0) nc = map[0].length - 1
      if (nc >= map[0].length) nc = 0
      if (map[nr] && map[nr][nc] !== 1) {
        pacman.dir = { ...pacman.nextDir }
      }
    }
    // Move pacman
    let pnr = pacman.r + pacman.dir.r
    let pnc = pacman.c + pacman.dir.c
    if (pnc < 0) pnc = map[0].length - 1
    if (pnc >= map[0].length) pnc = 0
    if (map[pnr] && map[pnr][pnc] !== 1) {
      pacman.r = pnr
      pacman.c = pnc
    }

    // Check collision with map elements
    if (map[pacman.r][pacman.c] === 0) {
      score.value += 10
      map[pacman.r][pacman.c] = 3
      dotsLeft--
    } else if (map[pacman.r][pacman.c] === 2) {
      score.value += 50
      map[pacman.r][pacman.c] = 3
      dotsLeft--
    }

    if (dotsLeft === 0) {
      gameWon.value = true
      pause.value = true
    }

    // Move ghosts
    ghosts.forEach(g => {
      let validDirs = getValidDirs(g.r, g.c)
      // Prevent reversing unless dead end
      let forwardDirs = validDirs.filter(d => d.r !== -g.dir.r || d.c !== -g.dir.c)
      if (forwardDirs.length === 0) forwardDirs = validDirs
      if (forwardDirs.length > 0) {
        let chosen = forwardDirs[Math.floor(Math.random() * forwardDirs.length)]
        g.dir = chosen
        g.r += g.dir.r
        g.c += g.dir.c
        if (g.c < 0) g.c = map[0].length - 1
        if (g.c >= map[0].length) g.c = 0
      }
    })

    // Check ghost collisions
    ghosts.forEach(g => {
      if (g.r === pacman.r && g.c === pacman.c) {
        gameOver.value = true
        pause.value = true
      }
    })
  }

  drawMap()
  drawPacman()
  drawGhosts()

  animationId = requestAnimationFrame(updateGame)
}

const commandsKey = (event) => {
  if (started.value) {
    let k = event.key
    if (!pause.value && !gameOver.value && !gameWon.value) {
      if (k === 'ArrowLeft' || k === 'q') pacman.nextDir = { r: 0, c: -1 }
      else if (k === 'ArrowRight' || k === 'd') pacman.nextDir = { r: 0, c: 1 }
      else if (k === 'ArrowUp' || k === 'z') {
        event.preventDefault()
        pacman.nextDir = { r: -1, c: 0 }
      }
      else if (k === 'ArrowDown' || k === 's') {
        event.preventDefault()
        pacman.nextDir = { r: 1, c: 0 }
      }
    }
    if (k === 'p' && !tutorialMode.value) {
      pause.value = !pause.value
      if (!pause.value) {
        lastTime = performance.now()
        updateGame(lastTime)
      }
    }
  }
}

const play = () => {
  started.value = true
  initializeGame()
  lastTime = performance.now()
  updateGame(lastTime)
}

const restart = () => {
  initializeGame()
  lastTime = performance.now()
  updateGame(lastTime)
}

onMounted(() => {
  document.addEventListener('keydown', commandsKey)
  canvas = document.getElementById('pacman-canvas')
  ctx = canvas.getContext('2d')
})

const handleGameEnd = async () => {
  cancelAnimationFrame(animationId)
  try {
    loading.value = true
    await sendUserVerificationRequest({ nickname: nickname.value, score: score.value, game: 'pacman' })
    const topPlayersResponse = await fetchTopPlayers({ game: 'pacman', limit: 10 })
    if (topPlayersResponse) topPlayers.value = topPlayersResponse
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

watch(gameOver, async (isGameOver) => {
  if (isGameOver) await handleGameEnd()
})

watch(gameWon, async (isGameWon) => {
  if (isGameWon) await handleGameEnd()
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
  <div v-show="!gameOver && !gameWon && started">
    <div class="text-center" v-if="!tutorialMode">
      <p class="text-2xl">Score : {{ score }}</p>
      <p class="text-amber-500" v-show="pause">PAUSE, press "P" to start!</p>
    </div>
    <div class="m-2" v-else>
      <p>Use arrow keys to move Pac-Man.</p>
      <p>Eat all dots to win. Avoid ghosts!</p>
      <p>Press "P" to pause the game.</p>
    </div>
    <div v-show="!tutorialMode" class="centered">
      <canvas id="pacman-canvas" width="380" height="340"></canvas>
    </div>
    <div class="centered gap-x-4">
      <button v-if="!tutorialMode" class="btn btn-amber" @click="pause = !pause; if(!pause) { lastTime = performance.now(); updateGame(lastTime); }">
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
  <div v-if="gameWon">
    <p class="text-2xl text-center text-green-500">You Win! Score : {{ score }} point(s)</p>
    <div class="centered mt-4">
      <button class="btn-lg btn-amber" @click="restart">Play again!</button>
    </div>
    <RankingScoreTable :loading="loading" :topPlayers="topPlayers" />
  </div>
</template>

<style scoped>
#pacman-canvas {
  @apply border-8 border-double border-amber-500 mb-4 mt-4 bg-black;
  width: 380px;
  height: 340px;
}
</style>
