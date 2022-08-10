import * as THREE from 'three'

export const INITIAL_DIR_LIGHT_POSITION_X = -100
export const INITIAL_DIR_LIGHT_POSITION_Y = -100

export function DefaultHemisphereLight() {
  return new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
}

export function DefaultDirectionalLight(player: THREE.Group) {
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6)
  dirLight.position.set(INITIAL_DIR_LIGHT_POSITION_X, INITIAL_DIR_LIGHT_POSITION_Y, 200)
  dirLight.castShadow = true
  dirLight.target = player
  return dirLight
}

export function DefaultDirectionalBlackLight() {
  const backLight = new THREE.DirectionalLight(0x000000, 0.4)
  backLight.position.set(200, 200, 50)
  backLight.castShadow = true
  return backLight
}
