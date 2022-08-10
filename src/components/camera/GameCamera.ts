import * as THREE from 'three'

export function OrthographicGameCamera(): THREE.OrthographicCamera {
  console.log('camera window innerWidth: ' + window.innerWidth)
  console.log('camera window innerHeight: ' + window.innerHeight)
  return new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    0.1,
    10000,
  )
}

export const INITIAL_ROTATION_X = (50 * Math.PI) / 180
export const INITIAL_ROTATION_Y = (20 * Math.PI) / 180
export const INITIAL_ROTATION_Z = (10 * Math.PI) / 180

export function InitialPositionX (distance: number, initialCameraPositionY: number) : number{
  return Math.tan(INITIAL_ROTATION_Y) * Math.sqrt(distance ** 2 + initialCameraPositionY ** 2)
}
export function InitialPositionY (distance: number) : number{
  return -Math.tan(INITIAL_ROTATION_X) * distance
}




