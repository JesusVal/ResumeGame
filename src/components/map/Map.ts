import * as THREE from 'three'

interface LaneProps {
  index: number
  mesh: THREE.Group
  occupiedPositions: Set<number>
}

enum TerrainsColor {
  Grass = 0xbaf455,
  Road = 0x454a59,
}

const default_map: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

export function generateMap(
  scene: THREE.Scene,
  columns: number,
  boardWidth: number,
  positionWidth: number,
  zoom: number,
  map_sheet = default_map,
) {
  return map_sheet.map((lane_data: number[], index: number) => {
    const lane = Lane(lane_data, index, columns, boardWidth, positionWidth, zoom)
    lane.mesh.position.y = index * positionWidth * zoom
    scene.add(lane.mesh)
    return lane
  })
}

function createSection(boardWidth: number, positionWidth: number, zoom: number, color: any) {
  return new THREE.Mesh(
    new THREE.PlaneBufferGeometry(boardWidth * zoom, positionWidth * zoom),
    new THREE.MeshPhongMaterial({ color }),
  )
}

function Lane(
  data: number[],
  index: number,
  columns: number,
  boardWidth: number,
  positionWidth: number,
  zoom: number,
) {
  let lane: LaneProps = {
    index: index,
    mesh: new THREE.Group(),
    occupiedPositions: new Set(),
  }

  const section_board_width = boardWidth / columns

  data.forEach((lane_element: number, index_lane_element: number) => {
    let section
    switch (lane_element) {
      case 0: {
        section = createSection(section_board_width, positionWidth, zoom, TerrainsColor.Grass)
        break
      }
      case 1: {
        section = createSection(section_board_width, positionWidth, zoom, TerrainsColor.Road)
        break
      }
      default: {
        section = createSection(section_board_width, positionWidth, zoom, TerrainsColor.Grass)
        break
      }
    }
    section.position.x =
      ((boardWidth * zoom) / columns) * (index_lane_element - (Math.floor(columns / 2)))
    section.receiveShadow = true
    lane.mesh.add(section)
  })

  return lane
}

/*
const generateLanes = () =>
  [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((index: number) => {
      const lane = Lane(index) as any
      lane.mesh.position.y = index * positionWidth * zoom
      scene.add(lane.mesh)
      return lane
    })
    .filter((lane) => lane.index >= 0)
    */
