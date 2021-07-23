import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber';
import { useRef, useState, useEffect } from 'react';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import * as THREE from 'three';
import { Suspense } from "react";

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

const Box = (props) => {
  const boxRef = useRef()
  const texture = useLoader(
    THREE.TextureLoader,
    '/wood.jpeg'
  )

  useFrame(state => {
    boxRef.current.rotation.x += 0.01
  })

  const handlePointerDown = e => {
    e.object.active = true;
    if (window.activeMesh) {
      scaleDown(window.activeMesh)
      window.activeMesh.active = false;
    }
    window.activeMesh = e.object
  }

  const handlePointerEnter = e => {
    e.object.scale.x = 1.5
    e.object.scale.y = 1.5
    e.object.scale.z = 1.5
  }

  const handlePointerLeave = e => {
    if (!e.object.active) {
      scaleDown(e.object)
    }
  }

  const scaleDown = object => {
    object.scale.x = 1
    object.scale.y = 1
    object.scale.z = 1
  }

  return (
    <mesh
      ref={boxRef}
      {...props}
      castShadow
      receiveShadow
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <sphereBufferGeometry args={[1,100,100]}/>
      <meshPhysicalMaterial map={texture}/>
    </mesh>
  )
}

const Floor = props => {
  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[15,1,10]}/>
      <meshPhysicalMaterial />
    </mesh>
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

const Background = props => {
  const texture = useLoader(
    THREE.TextureLoader,
    '/sky.jpeg'
  )

  // format the stretch of texture correctly
  const {gl} = useThree()
  const formattedTexture = new THREE.WebGLCubeRenderTarget(
    texture.image.height
  ).fromEquirectangularTexture(gl, texture)

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
        camera={{position: [6,6,6]}}
      >
        <fog attach='fog' args={['white', 1, 50]}/>
        <ambientLight intensity={0.2} />
        <Bulb position={[0,8,0]}/>

        <Orbit />

        {/* main objs */}
        <Drag>
          <Suspense fallback={null}>
            <Box position={[-3,1,0]}/>
          </Suspense>
          <Suspense fallback={null}>
            <Box position={[3,1,0]}/>
          </Suspense>
        </Drag>

        <axesHelper args={[5]}/>
        <Floor position={[0,-0.5,0]}/>

        <Suspense fallback={null}>
          <Background />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
