import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/marble_bust_01_1k.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.marble_bust_01.geometry} material={materials.marble_bust_01} position={[0, 0.028, 0]} />
    </group>
  )
}

useGLTF.preload('/marble_bust_01_1k.gltf')
