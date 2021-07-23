import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import * as THREE from 'three';
import {Physics, useTrimesh} from "use-cannon";
import { useBox } from "use-cannon";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

extend({ OrbitControls, DragControls });

const Orbit = () => {
  const {camera, gl} = useThree()
  return (
    <orbitControls
      attach='orbitControls'
      args={[camera, gl.domElement]}
    />
  )
}

const Drag = props => {
  const groupRef = useRef();
  const controlsRef = useRef();
  const [children, setChildren] = useState([])
  const { camera, gl, scene } = useThree();

  useEffect(() => {
    setChildren(groupRef.current.children)
  },[])

  useEffect(() => {
    controlsRef.current.addEventListener(
      'hoveron',
      e => scene.orbitControls.enabled = false
    )
    controlsRef.current.addEventListener(
      'hoveroff',
      e => scene.orbitControls.enabled = true
    )
    controlsRef.current.addEventListener(
      'dragstart',
      e => {
        e.object.api?.mass.set(0)
      }
    )
    controlsRef.current.addEventListener(
      'dragend',
      e => e.object.api?.mass.set(1)
    )
    controlsRef.current.addEventListener(
      'drag',
      e => {
        e.object.api?.position.copy(e.object.position)
        e.object.api?.velocity.set(0,0,0)
      }
    )
  },[children])

  return (
    <group ref={groupRef}>
      <dragControls
        transformGroup={props.transformGroup}
        ref={controlsRef}
        args={[children,camera, gl.domElement]}
      />
      {props.children}
    </group>
  )
}

const Bulb = props => {
  return (
    <mesh {...props}>
      <sphereBufferGeometry args={[0.2, 20, 10]} />
      <pointLight castShadow/>
      <meshPhongMaterial emissive='yellow'/>
    </mesh>
  )
}

const Model = props => {
  const model = useLoader(
    GLTFLoader,
    props.path
  )
  return (
    <primitive
      object={model.scene}
      {...props}
    />
  )
}

const BoundingBox = ({
  position = [0,0,0],
  offset = [0,0,0],
  dims=[1,1,1],
  visible = false,
  children
}) => {
  const [ref, api] = useBox(() => ({mass: 1, args: dims, position: position}))

  return (
    <group
      ref={ref}
      api={api}
    >
      <mesh
        scale={dims}
        visible={visible}
      >
        <boxBufferGeometry />
        <meshPhysicalMaterial wireframe />
      </mesh>
      <group
        position={offset}
      >
        {children}
      </group>
    </group>
  )
}

const Floor = props => {
  const [ref, api] = useBox(() =>
    ({
      args: [15,2,10],
      ...props
    })
  )

  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[15,1,10]}/>
      <meshPhysicalMaterial />
    </mesh>
  )
}

const Background = props => {
  const texture = useLoader(
    THREE.TextureLoader,
    '/bg.jpeg'
  )

  // format the stretch of texture correctly
  const {gl} = useThree()
  const formattedTexture = useMemo(() =>
      new THREE.WebGLCubeRenderTarget(
        texture.image.height
      ).fromEquirectangularTexture(gl, texture)
    ,[])

  return (
    <primitive
      object={formattedTexture}
      attach='background'
    />
  )
}

function App() {
  const handleClick = e => {
    if (!window.activeMesh) return
    window.activeMesh.material.color = new THREE.Color(e.target.style.background)
  }

  return (
    <div style={{height:'100vh', width: '100vw'}}>
      {/* color picker*/}
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          left: 0,
          right: 0,
          margin: 'auto',
          width: 'fit-content',
          display: 'flex',
          top: '20px'
        }}
      >
        <div
          onClick={handleClick}
          style={{
            background: 'blue',
            height: 50,
            width: 50
          }}
        >

        </div>
        <div
          onClick={handleClick}
          style={{
            background: 'yellow',
            height: 50,
            width: 50
          }}
        >

        </div>
        <div
          onClick={handleClick}
          style={{
            background: 'white',
            height: 50,
            width: 50
          }}
        >

        </div>
      </div>

      <Canvas
        shadowMap
        camera={{position: [10,10,10]}}
      >
        <ambientLight intensity={0.2} />
        <Orbit />
        <Bulb position={[0,5,0]}/>

        {/* main objs */}
        <Physics>
          <Suspense fallback={null}>
            <Drag transformGroup>
              <BoundingBox
                position={[4,1.5,0]}
                dims={[3.2,1.7,7.5]}
                offset={[0,-1.2,0]}
                visible
              >
                <Model
                  path='/dodge_challenger/scene.gltf'
                  scale={[0.015, 0.015, 0.015]}
                />
              </BoundingBox>
            </Drag>

            <Drag transformGroup>
              <BoundingBox
                position={[-4,1.5,0]}
                dims={[4,1.3,8.7]}
                offset={[0,-0.1,0.5]}
                visible
              >
                <Model
                  path='/lamborghini_aventador_j/scene.gltf'
                  scale={[0.0085, 0.0085, 0.0085]}
                />
              </BoundingBox>
            </Drag>
          </Suspense>
          <Floor position={[0,-0.5,0]}/>
        </Physics>

        <axesHelper args={[5]}/>
        <Suspense fallback={null}>
          <Background />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
