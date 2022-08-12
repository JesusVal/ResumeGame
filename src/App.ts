import * as THREE from 'three'
import * as GAMECAMERA from './components/camera/GameCamera'
import * as GAMELIGHTS from './components/lights/GameLights'
import { generateMap } from './components/map/Map'
import { Player } from './components/mesh/player/Player'

const counterDOM = document.getElementById('counter')
const endDOM = document.getElementById('end')

const scene = new THREE.Scene()

const distance = 500
const zoom = 2

const positionWidth = 42
const columns = 17
const boardWidth = positionWidth * columns

const stepTime = 200

const camera = GAMECAMERA.OrthographicGameCamera()

camera.rotation.x = GAMECAMERA.INITIAL_ROTATION_X
camera.rotation.y = GAMECAMERA.INITIAL_ROTATION_Y
camera.rotation.z = GAMECAMERA.INITIAL_ROTATION_Z

const initialCameraPositionY = GAMECAMERA.InitialPositionY(distance)
const initialCameraPositionX = GAMECAMERA.InitialPositionX(distance, camera.position.y)

camera.position.y = initialCameraPositionY
camera.position.x = initialCameraPositionX
camera.position.z = distance

let lanes: any[]
let currentLane: any
let currentColumn: any

let previousTimestamp: number | null
let startMoving: boolean
let moves: any
let stepStartTimestamp: any

const player = Player(zoom)
scene.add(player)

const dirLight = GAMELIGHTS.DefaultDirectionalLight(player)
scene.add(GAMELIGHTS.DefaultHemisphereLight())
scene.add(dirLight)

dirLight.shadow.mapSize.width = 2048
dirLight.shadow.mapSize.height = 2048
var d = 500
dirLight.shadow.camera.left = -d
dirLight.shadow.camera.right = d
dirLight.shadow.camera.top = d
dirLight.shadow.camera.bottom = -d

var helper = new THREE.CameraHelper(dirLight.shadow.camera)
var helper = new THREE.CameraHelper(camera)
scene.add(helper)

scene.add(GAMELIGHTS.DefaultDirectionalBlackLight())

/*
const addLane = () => {
  const index: number = lanes.length
  const lane = Lane(index) as any
  lane.mesh.position.y = index * positionWidth * zoom
  scene.add(lane.mesh)
  lanes.push(lane)
}
*/

const initaliseValues = () => {
  //lanes = generateLanes()
  lanes = generateMap(scene, columns, boardWidth, positionWidth, zoom)

  currentLane = 0
  currentColumn = Math.floor(columns / 2)

  previousTimestamp = null

  startMoving = false
  moves = []
  stepStartTimestamp

  player.position.x = 0
  player.position.y = 0

  camera.position.y = initialCameraPositionY
  camera.position.x = initialCameraPositionX

  dirLight.position.x = GAMELIGHTS.INITIAL_DIR_LIGHT_POSITION_X
  dirLight.position.y = GAMELIGHTS.INITIAL_DIR_LIGHT_POSITION_Y
}

initaliseValues()

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
;(document.querySelector('#retry') as any).addEventListener('click', () => {
  lanes.forEach((lane) => scene.remove(lane.mesh))
  initaliseValues()
  ;(endDOM as any).style.visibility = 'hidden'
})
;(document.getElementById('forward') as any).addEventListener('click', () => move('forward'))
;(document.getElementById('backward') as any).addEventListener('click', () => move('backward'))
;(document.getElementById('left') as any).addEventListener('click', () => move('left'))
;(document.getElementById('right') as any).addEventListener('click', () => move('right'))

window.addEventListener('keydown', (event) => {
  if (event.keyCode == 38) {
    // up arrow
    move('forward')
  } else if (event.keyCode == 40) {
    // down arrow
    move('backward')
  } else if (event.keyCode == 37) {
    // left arrow
    move('left')
  } else if (event.keyCode == 39) {
    // right arrow
    move('right')
  }
})

function move(direction: string) {
  const finalPositions = moves.reduce(
    (position: { lane: number; column: number }, move: string) => {
      if (move === 'forward') return { lane: position.lane + 1, column: position.column }
      if (move === 'backward') return { lane: position.lane - 1, column: position.column }
      if (move === 'left') return { lane: position.lane, column: position.column - 1 }
      if (move === 'right') return { lane: position.lane, column: position.column + 1 }
    },
    { lane: currentLane, column: currentColumn },
  )

  if (direction === 'forward') {
    if (
      lanes[finalPositions.lane + 1].type === 'forest' &&
      lanes[finalPositions.lane + 1].occupiedPositions.has(finalPositions.column)
    )
      return
    if (!stepStartTimestamp) startMoving = true
    //addLane()
  } else if (direction === 'backward') {
    if (finalPositions.lane === 0) return
    if (
      lanes[finalPositions.lane - 1].type === 'forest' &&
      lanes[finalPositions.lane - 1].occupiedPositions.has(finalPositions.column)
    )
      return
    if (!stepStartTimestamp) startMoving = true
  } else if (direction === 'left') {
    if (finalPositions.column === 0) return
    if (
      lanes[finalPositions.lane].type === 'forest' &&
      lanes[finalPositions.lane].occupiedPositions.has(finalPositions.column - 1)
    )
      return
    if (!stepStartTimestamp) startMoving = true
  } else if (direction === 'right') {
    if (finalPositions.column === columns - 1) return
    if (
      lanes[finalPositions.lane].type === 'forest' &&
      lanes[finalPositions.lane].occupiedPositions.has(finalPositions.column + 1)
    )
      return
    if (!stepStartTimestamp) startMoving = true
  }
  moves.push(direction)
}

function animate(timestamp: number) {
  requestAnimationFrame(animate)

  if (!previousTimestamp) previousTimestamp = timestamp
  const delta = timestamp - previousTimestamp
  previousTimestamp = timestamp

  // Animate cars and trucks moving on the lane
  lanes.forEach((lane) => {
    if (lane.type === 'car' || lane.type === 'truck') {
      const aBitBeforeTheBeginingOfLane = (-boardWidth * zoom) / 2 - positionWidth * 2 * zoom
      const aBitAfterTheEndOFLane = (boardWidth * zoom) / 2 + positionWidth * 2 * zoom
      lane.vechicles.forEach((vechicle: { position: { x: number } }) => {
        if (lane.direction) {
          vechicle.position.x =
            vechicle.position.x < aBitBeforeTheBeginingOfLane
              ? aBitAfterTheEndOFLane
              : (vechicle.position.x -= (lane.speed / 16) * delta)
        } else {
          vechicle.position.x =
            vechicle.position.x > aBitAfterTheEndOFLane
              ? aBitBeforeTheBeginingOfLane
              : (vechicle.position.x += (lane.speed / 16) * delta)
        }
      })
    }
  })

  if (startMoving) {
    stepStartTimestamp = timestamp
    startMoving = false
  }

  if (stepStartTimestamp) {
    const moveDeltaTime = timestamp - stepStartTimestamp
    const moveDeltaDistance = Math.min(moveDeltaTime / stepTime, 1) * positionWidth * zoom
    const jumpDeltaDistance = Math.sin(Math.min(moveDeltaTime / stepTime, 1) * Math.PI) * 8 * zoom
    switch (moves[0]) {
      case 'forward': {
        const positionY = currentLane * positionWidth * zoom + moveDeltaDistance
        camera.position.y = initialCameraPositionY + positionY
        dirLight.position.y = GAMELIGHTS.INITIAL_DIR_LIGHT_POSITION_Y + positionY
        player.position.y = positionY // initial chicken position is 0

        player.position.z = jumpDeltaDistance
        break
      }
      case 'backward': {
        const positionY = currentLane * positionWidth * zoom - moveDeltaDistance
        camera.position.y = initialCameraPositionY + positionY
        dirLight.position.y = GAMELIGHTS.INITIAL_DIR_LIGHT_POSITION_Y + positionY
        player.position.y = positionY

        player.position.z = jumpDeltaDistance
        break
      }
      case 'left': {
        const positionX =
          (currentColumn * positionWidth + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2 -
          moveDeltaDistance
        camera.position.x = initialCameraPositionX + positionX
        dirLight.position.x = GAMELIGHTS.INITIAL_DIR_LIGHT_POSITION_X + positionX
        player.position.x = positionX // initial chicken position is 0
        player.position.z = jumpDeltaDistance
        break
      }
      case 'right': {
        const positionX =
          (currentColumn * positionWidth + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2 +
          moveDeltaDistance
        camera.position.x = initialCameraPositionX + positionX
        dirLight.position.x = GAMELIGHTS.INITIAL_DIR_LIGHT_POSITION_X + positionX
        player.position.x = positionX

        player.position.z = jumpDeltaDistance
        break
      }
    }
    // Once a step has ended
    if (moveDeltaTime > stepTime) {
      switch (moves[0]) {
        case 'forward': {
          currentLane++
          ;(counterDOM as any).innerHTML = currentLane
          break
        }
        case 'backward': {
          currentLane--
          ;(counterDOM as any).innerHTML = currentLane
          break
        }
        case 'left': {
          currentColumn--
          break
        }
        case 'right': {
          currentColumn++
          break
        }
      }
      moves.shift()
      // If more steps are to be taken then restart counter otherwise stop stepping
      stepStartTimestamp = moves.length === 0 ? null : timestamp
    }
  }

  // Hit test
  // if (lanes[currentLane].type === 'car' || lanes[currentLane].type === 'truck') {
  //   const chickenMinX = player.position.x - (PLAYER_SIZE * zoom) / 2
  //   const chickenMaxX = player.position.x + (PLAYER_SIZE * zoom) / 2
  //   const vechicleLength = { car: 60, truck: 105 }[lanes[currentLane].type]
  //   lanes[currentLane].vechicles.forEach((vechicle: { position: { x: number } }) => {
  //     const carMinX = vechicle.position.x - (vechicleLength * zoom) / 2
  //     const carMaxX = vechicle.position.x + (vechicleLength * zoom) / 2
  //     if (chickenMaxX > carMinX && chickenMinX < carMaxX) {
  //       (endDOM as any).style.visibility = 'visible'
  //     }
  //   })
  // }
  renderer.render(scene, camera)
}

requestAnimationFrame(animate)
