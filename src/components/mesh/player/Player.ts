import * as THREE from 'three'

export const PLAYER_SIZE = 15

export function Player(zoom: number, playerColor = 0xffffff): THREE.Group {
  const player = new THREE.Group()

  const body = new THREE.Mesh(
    new THREE.BoxBufferGeometry(PLAYER_SIZE * zoom, PLAYER_SIZE * zoom, 20 * zoom),
    new THREE.MeshPhongMaterial({ color: playerColor, flatShading: true }),
  )

  body.position.z = 10 * zoom
  body.castShadow = true
  body.receiveShadow = true
  player.add(body)

  const rowel = new THREE.Mesh(
    new THREE.BoxBufferGeometry(2 * zoom, 4 * zoom, 2 * zoom),
    new THREE.MeshPhongMaterial({ color: 0xf0619a, flatShading: true }),
  )
  rowel.position.z = 21 * zoom
  rowel.castShadow = true
  rowel.receiveShadow = false

  player.add(rowel)

  return player
}
