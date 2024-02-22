import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSnapshot } from 'valtio'
import { state } from './Store'
import { easing } from 'maath'
import { applyProps } from '@react-three/fiber'

export function Vest(props) {
  const { nodes, materials } = useGLTF('/models/vest.gltf')
  const vest = useRef()
  const snap = useSnapshot(state)

  useFrame((state, delta) => {
    vest.current.rotation.y += 0.01;;

  })
  applyProps(materials['buclkes.001'], {color: snap.color})
  applyProps(materials['vest.001'], {color: snap.color})

  return (
    <group {...props} dispose={null} castShadow ref={vest}>
      <mesh geometry={nodes.buckles_set001.geometry} material={materials['buclkes.001']} rotation={[Math.PI / 2, 0, 0]} scale={34.832} />
      <mesh geometry={nodes.vest.geometry} material={materials['vest.001']} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.vest002.geometry} material={materials['vest.001']} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.vest003.geometry} material={materials['buclkes.001']} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.vest004.geometry} material={materials['vest.001']} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.vest005.geometry} material={materials['vest.001']} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.vest006.geometry} material={materials['vest.001']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
  }

useGLTF.preload('/models/vest.gltf')
