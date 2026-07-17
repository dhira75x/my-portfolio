<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { fetchTopPlayers, sendUserVerificationRequest } from '../utils'
import RankingScoreTable from './RankingScoreTable.vue'

const emit = defineEmits(['changeMode'])

const nickname = ref(null)
const tutorialMode = ref(false)
const pause = ref(true)
const gameOver = ref(false)
const started = ref(false)
const loading = ref(false)
const score = ref(0)
const topPlayers = ref([])

const grid = ref([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
])

const addRandomTile = () => {
  const emptyCells = []
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid.value[r][c] === 0) {
        emptyCells.push({ r, c })
      }
    }
  }
  if (emptyCells.length > 0) {
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    grid.value[r][c] = Math.random() < 0.9 ? 2 : 4
  }
}

const initializeGame = () => {
  grid.value = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
  score.value = 0
  gameOver.value = false
  addRandomTile()
  addRandomTile()
}

const slide = (row) => {
  let arr = row.filter(val => val)
  let missing = 4 - arr.length
  let zeros = Array(missing).fill(0)
  return arr.concat(zeros)
}

const combine = (row) => {
  for (let i = 0; i < 3; i++) {
    if (row[i] !== 0 && row[i] === row[i + 1]) {
      row[i] *= 2
      score.value += row[i]
      row[i + 1] = 0
    }
  }
  return row
}

const operate = (row) => {
  row = slide(row)
  row = combine(row)
  row = slide(row)
  return row
}

const moveLeft = () => {
  let changed = false
  for (let i = 0; i < 4; i++) {
    let row = grid.value[i]
    let newRow = operate([...row])
    if (row.join(',') !== newRow.join(',')) {
      changed = true
      grid.value[i] = newRow
    }
  }
  return changed
}

const moveRight = () => {
  let changed = false
  for (let i = 0; i < 4; i++) {
    let row = [...grid.value[i]].reverse()
    let newRow = operate(row)
    newRow.reverse()
    if (grid.value[i].join(',') !== newRow.join(',')) {
      changed = true
      grid.value[i] = newRow
    }
  }
  return changed
}

const moveUp = () => {
  let changed = false
  for (let c = 0; c < 4; c++) {
    let col = [grid.value[0][c], grid.value[1][c], grid.value[2][c], grid.value[3][c]]
    let newCol = operate([...col])
    if (col.join(',') !== newCol.join(',')) {
      changed = true
      for (let r = 0; r < 4; r++) {
        grid.value[r][c] = newCol[r]
      }
    }
  }
  return changed
}

const moveDown = () => {
  let changed = false
  for (let c = 0; c < 4; c++) {
    let col = [grid.value[3][c], grid.value[2][c], grid.value[1][c], grid.value[0][c]]
    let newCol = operate([...col])
    newCol.reverse()
    if ([grid.value[0][c], grid.value[1][c], grid.value[2][c], grid.value[3][c]].join(',') !== newCol.join(',')) {
      changed = true
      for (let r = 0; r < 4; r++) {
        grid.value[r][c] = newCol[r]
      }
    }
  }
  return changed
}

const isGameOver = () => {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid.value[r][c] === 0) return false
      if (c !== 3 && grid.value[r][c] === grid.value[r][c + 1]) return false
      if (r !== 3 && grid.value[r][c] === grid.value[r + 1][c]) return false
    }
  }
  return true
}

const commandsKey = (event) => {
  if (started.value && !pause.value && !gameOver.value) {
    let changed = false
    const k = event.key
    if (k === 'ArrowLeft' || k === 'q') changed = moveLeft()
    else if (k === 'ArrowRight' || k === 'd') changed = moveRight()
    else if (k === 'ArrowUp' || k === 'z') {
      event.preventDefault()
      changed = moveUp()
    }
    else if (k === 'ArrowDown' || k === 's') {
      event.preventDefault()
      changed = moveDown()
    }

    if (changed) {
      addRandomTile()
      if (isGameOver()) {
        gameOver.value = true
        pause.value = true
      }
    }
  }
  
  if (started.value && event.key === 'p' && !tutorialMode.value) {
    pause.value = !pause.value
  }
}

const play = () => {
  started.value = true
  pause.value = false
  initializeGame()
}

const restart = () => {
  initializeGame()
  pause.value = false
}

const getCellColor = (val) => {
  const colors = {
    0: '#ccc0b3',
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e'
  }
  return colors[val] || '#3c3a32'
}

const getTextColor = (val) => {
  return val <= 4 ? '#776e65' : '#f9f6f2'
}

onMounted(() => {
  document.addEventListener('keydown', commandsKey)
})

watch(gameOver, async (isGameOver) => {
  if (isGameOver) {
    try {
      loading.value = true
      await sendUserVerificationRequest({ nickname: nickname.value, score: score.value, game: '2048' })
      const topPlayersResponse = await fetchTopPlayers({ game: '2048', limit: 10 })
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
      <p>Use arrow keys to move tiles.</p>
      <p>Tiles with the same number merge into one when they touch.</p>
      <p>Add them up to reach 2048!</p>
      <p>Press "P" to pause the game.</p>
    </div>
    <div v-show="!tutorialMode" class="centered mb-4 mt-4">
      <div class="grid-container">
        <div v-for="(row, rIndex) in grid" :key="rIndex" class="grid-row">
          <div v-for="(cell, cIndex) in row" :key="cIndex" 
               class="grid-cell"
               :style="{ backgroundColor: getCellColor(cell), color: getTextColor(cell) }">
            {{ cell > 0 ? cell : '' }}
          </div>
        </div>
      </div>
    </div>
    <div class="centered gap-x-4">
      <button v-if="!tutorialMode" class="btn btn-amber" @click="pause = !pause">
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
.grid-container {
  background-color: #bbada0;
  border-radius: 6px;
  padding: 8px;
  display: inline-block;
}
.grid-row {
  display: flex;
}
.grid-cell {
  width: 60px;
  height: 60px;
  margin: 4px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  font-family: Arial, sans-serif;
}
</style>
