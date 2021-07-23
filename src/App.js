import {Canvas, useFrame, useThree, extend, useLoader} from 'react-three-fiber';
import {useRef} from 'react';
import {
  OrbitControls
} from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three';
import {Suspense} from "react";
extend({OrbitControls});

const Orbit = () => {
  const {camera, gl} = useThree()
  return (
    <orbitControls args={[camera, gl.domElement]}/>
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

  return (
    <mesh
      ref={boxRef}
      {...props}
      castShadow
      receiveShadow
      onPointerDown={e => {
        // lock the scale if clicked
        e.object.active = true
        if (window.activeMesh) {
          e.object.scale.x = 1
          e.object.scale.y = 1
          e.object.scale.z = 1
          window.activeMesh = false
        }
        window.activeMesh = e.object
        }
      }
      onPointerEnter={e => {
        e.object.scale.x = 1.5
        }
      }
      onPointerLeave={e => {
        if (!e.object.active) {
          e.object.scale.x = 1
          e.object.scale.y = 1
          e.object.scale.z = 1
          }
        }
      }
      >
      <sphereBufferGeometry args={[1,100,100]}/>
      <Orbit />
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
    <div
      style={{height:'100vh', width: '100vw'}}
    >
      <div style={{position: 'absolute', zIndex: '1'}}>
        <div
          onClick={handleClick}
          style={{background: 'blue', height: '50px', width: '50px'}}
        >

        </div>
        <div
          onClick={handleClick}
          style={{background: 'yellow', height: '50px', width: '50px'}}
        >

        </div>
        <div
          onClick={handleClick}
          style={{background: 'white', height: '50px', width: '50px'}}
        >

        </div>
      </div>
      <Canvas
        shadowMap
        camera={{position: [6,6,6]}}
      >
        <fog attach='fog' args={['white', 1, 20]}/>
        <ambientLight intensity={0.2} />
        <Bulb position={[0,8,0]}/>

        <Suspense fallback={null}>
          <Box position={[-3,1,0]}/>
        </Suspense>
        <Suspense fallback={null}>
          <Box position={[3,1,0]}/>
        </Suspense>
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
