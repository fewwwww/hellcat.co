import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import * as THREE from 'three';
import { Physics } from "use-cannon";
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

const Box = (props) => {
  const [ref, api] = useBox(() => ({mass: 1, ...props}))
  const texture = useLoader(
    THREE.TextureLoader,
    '/wood.jpeg'
  )
  //
  // useFrame(state => {
  //   boxRef.current.rotation.x += 0.01
  // })

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
      ref={ref}
      api={api}
      {...props}
      castShadow
      receiveShadow
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <sphereBufferGeometry args={[1,100,100]}/>
      <meshPhysicalMaterial
        map={texture}
      />
    </mesh>
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

        {/* main objs */}
        <Physics>
          <Drag>
            <Bulb position={[0,10,0]}/>

            <Suspense fallback={null}>
              <Model
                path='/dodge_challenger/scene.gltf'
                position={[4,0.3,0]}
                scale={[0.015, 0.015, 0.015]}
              />
            </Suspense>

            <Suspense fallback={null}>
              <Model
                path='/lamborghini_aventador_j/scene.gltf'
                position={[-4,1.15,0]}
                scale={[0.0085, 0.0085, 0.0085]}
              />
            </Suspense>
          </Drag>
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
