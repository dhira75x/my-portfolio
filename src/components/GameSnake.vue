<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { hexaColors } from '../constant'
import RankingScoreTable from './RankingScoreTable.vue'
import { fetchTopPlayers, sendUserVerificationRequest } from '../utils'

const emit = defineEmits(['changeMode'])

/* Object refs */
const snake = ref({ x: 50, y: 50, length: 1, body: [] })
const food = ref({ x: 0, y: 0 })
/* String refs */
const direction = ref('right')
const nickname = ref(null)
/* Boolean refs */
const tutorialMode = ref(false)
const pause = ref(true)
const gameOver = ref(false)
const started = ref(false)
const rainbowMode = ref(false)
const loading = ref(false)
/* Number refs */
const score = ref(0)
const speed = ref(200)
/* Array ref */
const topPlayers = ref([])
/* Computed ref */
const checkFood = computed(() => {
  return snake.value.x === food.value.x
    && snake.value.y === food.value.y
})
const checkWallCollisions = computed(() => {
  return snake.value.y > canvas.height || snake.value.y < 0 ||
    snake.value.x > canvas.width || snake.value.x < 0
})
const checkBodyCollisions = computed(() => {
  return snake.value.body.some(segment =>
    segment[0] === snake.value.x && segment[1] === snake.value.y)
})

/* Options for game difficulty  */
const difficulties = [
  { value: 200, label: 'Easy' },
  { value: 100, label: 'Medium' },
  { value: 75, label: 'Hard' }
]

/* Global variables */
const cellSize = 5
const colors = hexaColors
var canvas = null
var ctx = null
var moveIntervalId = null

/* All function, life cycle hooks and watch ref  */
const commandsKey = (event) => {
  if (started.value) {
    let k = event.key
    /* You can only change direction when the game is started and not paused */
    if (!pause.value) {
      if (k === 'q' || k === 'ArrowLeft') direction.value = 'left'
      else if (k === 'z' || k === 'ArrowUp') {
        event.preventDefault()
        direction.value = 'up'
      }
      else if (k === 'd' || k === 'ArrowRight') direction.value = 'right'
      else if (k === 's' || k === 'ArrowDown') {
        event.preventDefault()
        direction.value = 'down'
      }
    }
    if (k === 'p' && !tutorialMode.value) pause.value = !pause.value
  }
}

const play = () => {
  started.value = true
  if (!rainbowMode.value)
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
  drawSnake()
  drawFood()
}

const restart = () => {
  gameOver.value = false
  score.value = 0
  snake.value = { x: 50, y: 50, length: 1, body: [] }
  direction.value = 'right'
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  play()
}

onMounted(() => {
  document.addEventListener('keydown', commandsKey)
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
})

watch(pause, (isPaused) => {
  /* if the game is started */
  if (started.value) {
    /*
     If the game is paused, the method clearInterval is called 
     with the identifier (moveIntervalId). Otherwise a new value 
     is assigned to this indicator and restarts the game.
    */
    isPaused ? clearInterval(moveIntervalId) :
      moveIntervalId = setInterval(moveSnake, speed.value);
  }
})

watch(gameOver, async (isGameOver) => {
  if (isGameOver) {
    try {
      loading.value = true
      await sendUserVerificationRequest({ nickname: nickname.value, score: score.value, game: 'snake' })
      const topPlayersResponse = await fetchTopPlayers({ game: 'snake', limit: 10 })
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
  clearInterval(moveIntervalId)
})

const moveSnake = () => {
  if (checkFood.value) {
    score.value += 20
    snake.value.length += 1
    drawFood()
  }
  if (direction.value === 'right') snake.value.x += cellSize
  else if (direction.value === 'left') snake.value.x -= cellSize
  else if (direction.value === 'up') snake.value.y -= cellSize
  else if (direction.value === 'down') snake.value.y += cellSize
  if (checkBodyCollisions.value || checkWallCollisions.value) {
    pause.value = true
    gameOver.value = true
  }
  drawSnake()
}

const drawSnake = () => {
  snake.value.body.push([snake.value.x, snake.value.y])
  if (rainbowMode.value)
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
  ctx.fillRect(snake.value.x, snake.value.y, cellSize, cellSize)
  if (snake.value.body.length > snake.value.length) {
    let first = snake.value.body.shift()
    ctx.clearRect(first[0], first[1], cellSize, cellSize)
  }
}

const drawFood = () => {
  let randPoint = [
    Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize,
    Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize
  ]
  while (snake.value.body.some(segment => {
    return segment[0] === randPoint[0] && segment[1] === randPoint[1]
  })) {
    randPoint = [
      Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize,
      Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize
    ]
  }
  food.value = { x: randPoint[0], y: randPoint[1] }
  ctx.fillRect(food.value.x, food.value.y, cellSize, cellSize)
}
</script>

<template>
  <div class="centered flex-col gap-y-4" v-if="!started">
    <input class="bg-transparent text-xl text-amber-500 py-4 px-8 outline-0 border border-amber-500 rounded-lg"
      type="text"
      v-model="nickname"
      placeholder="Enter your Nickname!" />
    <p class="text-lg">I advise you to play in hard mode, it's more fun! ;)</p>
    <select class="text-xl" v-model="speed">
      <option v-for="d in difficulties" :key="d.label" :value="d.value">
        {{ d.label }}
      </option>
    </select>
    <label> Rainbow Mode : {{ rainbowMode }}
      <input type="checkbox" v-model="rainbowMode" />
    </label>
    <button v-show="nickname" class="btn-lg btn-amber" @click="play">Play Now!</button>
  </div>
  <div v-show="!gameOver && started">
    <div class="text-center" v-if="!tutorialMode">
      <p class="text-2xl">Score : {{ score }}</p>
      <p class="text-amber-500" v-show="pause">PAUSE, press "P" to start!</p>
    </div>
    <div class="m-2" v-else>
      <p>To go Up press "Arrow Up" or "Z".</p>
      <p>To go Down press "Arrow Down" or "S".</p>
      <p>To go Right press "Arrow Right" or "D".</p>
      <p>To go left press "Arrow Left" or "Q".</p>
      <p>Press "P" to pause the game, and press again to exit pause mode.</p>
    </div>
    <div v-show="!tutorialMode" class="centered">
      <canvas id="canvas">
        What a shame! You can't play Snake because your browser doesn't support canvas.
      </canvas>
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
#canvas {
  @apply border-8 border-double border-amber-500 mb-4 mt-4;
  width: 66%;
}
</style>
