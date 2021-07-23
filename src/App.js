import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import * as THREE from 'three';
import {Physics, useTrimesh} from "use-cannon";
import { useBox } from "use-cannon";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import state from './state';
import Github from './github.png';

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
      <sphereBufferGeometry args={[0.2, 20, 10]}/>
      <pointLight
        castShadow
        shadow-mapSize-height={2 ** 10}
        shadow-mapSize-width={2 ** 10}
        shadow-radius={ 10 }
      />
      <meshPhongMaterial emissive='yellow'/>
    </mesh>
  )
}

const Logo = () => {
  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'space-between',
        width: '90vw',
        left: '5vw',
        zIndex: '1',
        top: '10px'
      }}
    >
      <div
        style={{
          fontSize: '50px'
        }}
      >
        𝖍𝖊𝖑𝖑𝖈𝖆𝖙.𝖈𝖔
      </div>
      <a href="https://github.com/fewwwww/hellcat.co">
        <img src={Github} alt="https://github.com/fewwwww/hellcat.co"/>
      </a>
    </div>
  )
}

const Model = props => {
  const model = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + props.path
  )

  let mixer
  if (model.animations.length > 0) {
    mixer = new THREE.AnimationMixer(model.scene)
    model.animations.forEach(clip => {
      const action = mixer.clipAction(clip)
      action.play()
    })
  }

  useFrame((scene,delta) => {
    mixer?.update(delta)
  })

  model.scene.traverse(child => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.material.side = THREE.FrontSide
    }
  })

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
      args: [20,2,10],
      ...props
    })
  )

  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[200, 1, 200]}/>
      <meshPhysicalMaterial transparent opacity={0.2}/>
    </mesh>
  )
}

const Background = props => {
  const texture = useLoader(
    THREE.TextureLoader,
    process.env.PUBLIC_URL + '/bg.jpg'
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

const CameraControls = ({}) => {
  useFrame(({camera, scene}) => {
    if (state.activeMesh.name !== state.activeMeshName) {
      state.activeMesh = scene.getObjectByName(
        state.activeMeshName
      ) || {}
    }
    if (state.shouldUpdate) {
      camera.position.lerp(state.cameraPos, 0.1)
      scene.orbitControls.target.lerp(state.target, 0.1)
      scene.orbitControls.update()
      const diff = camera.position.clone().sub(state.cameraPos).length()
      if (diff < 0.1) {state.shouldUpdate = false}
    }
  })
  return (
    null
  )
}

const CameraButtons = ({}) => {
  const sets = {
    1: {
      cameraPos: [-15,3,9],
      target: [-4,0,0],
      name: 'object028_Material005_0'
    },
    2: {
      cameraPos: [9,4,9],
      target: [4,0,0],
      name: 'object001_Material011_0'
    }
  }

  const handleClick = (num) => {
    state.cameraPos.set(...sets[num].cameraPos)
    state.target.set(...sets[num].target)
    state.activeMeshName = sets[num].name
    state.shouldUpdate = true
  }

  return (
    <>
      <button
        onClick={e => handleClick(1)}
        style={{
          zIndex: '1',
          position: 'absolute',
          bottom: '10vh',
          left: '40vw',
          height: '50px',
          width: '50px',
          background: 'white',
          textAlign: 'center',
          borderRadius: '100%',
          fontSize: '30px',
          fontWeight: '900',
          opacity: '0.7',
          border: '1px solid black',
          cursor: 'pointer'
        }}
      >
        {'<'}
      </button>
      <button
        onClick={e => handleClick(2)}
        style={{
          zIndex: '1',
          position: 'absolute',
          bottom: '10vh',
          right: '40vw',
          height: '50px',
          width: '50px',
          background: 'white',
          textAlign: 'center',
          borderRadius: '100%',
          fontSize: '30px',
          fontWeight: '900',
          opacity: '0.7',
          border: '1px solid black',
          cursor: 'pointer'
        }}
      >
        {'>'}
      </button>
    </>
  )
}

const ColorPicker = props => {
  const handleClick = e => {
    if (!state.activeMesh) return
    state.activeMesh.material.color = new THREE.Color(e.target.style.background)
  }
  return (
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
          background: '#de0f18',
          height: 50,
          width: 50
        }}
      >

      </div>
      <div
        onClick={handleClick}
        style={{
          background: 'black',
          height: 50,
          width: 50
        }}
      >

      </div>
      <div
        onClick={handleClick}
        style={{
          background: '#fffff6',
          height: 50,
          width: 50
        }}
      >

      </div>
    </div>
  )
}

function App() {

  return (
    <div style={{height:'100vh', width: '100vw'}}>
      <CameraButtons />
      <ColorPicker />
      <Logo />

      <Canvas
        shadowMap
        camera={{position: [10,10,10]}}
      >
        <CameraControls />
        <ambientLight intensity={0.2} />
        <Orbit />
        <directionalLight
          position={[0,20,3]}
          intensity={1}
          castShadow
        />
        <Bulb position={[-8,5,0]}/>
        <Bulb position={[0,15,10]}/>
        <Bulb position={[8,5,0]}/>

        {/* main objs */}
        <Physics>
          <Suspense fallback={null}>
            <Drag transformGroup>
              <BoundingBox
                position={[4,2,0]}
                dims={[3.2,1.7,7.5]}
                offset={[0,-1.2,0]}
              >
                <Model
                  path='/dodge_challenger/scene.gltf'
                  scale={[0.015, 0.015, 0.015]}
                />
              </BoundingBox>
            </Drag>

            <Drag transformGroup>
              <BoundingBox
                position={[-4,2,0]}
                dims={[4,1.3,8.7]}
                offset={[0,-0.1,0.5]}
              >
                <Model
                  path='/lamborghini_aventador_j/scene.gltf'
                  scale={[0.0085, 0.0085, 0.0085]}
                />
              </BoundingBox>
            </Drag>
            <Model
              path='/reap_the_whirlwind/scene.gltf'
              scale={[0.008, 0.008, 0.008]}
            />
          </Suspense>
          <Floor
            position={[0,-0.5,0]}
          />
        </Physics>

        <Suspense fallback={null}>
          <Background />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
