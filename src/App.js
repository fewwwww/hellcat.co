import {Canvas, useFrame, useThree, extend, useLoader} from 'react-three-fiber';
import {useEffect, useRef} from 'react';
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
      receiveShadow>
      <sphereBufferGeometry args={[1,100,100]}/>
      <Orbit />
      <meshPhysicalMaterial map={texture}/>
    </mesh>
  )
}

const Floor = props => {
  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[10,1,10]}/>
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

  return (
    <Canvas
      shadowMap
      style={{height:'100vh', width: '100vw', background: 'black'}}
      camera={{position: [3, 3, 3]}}
    >
      <fog attach='fog' args={['white', 1, 10]}/>
      <ambientLight intensity={0.2} />
      <Bulb position={[1,3,1]}/>
      <Suspense fallback={null}>
        <Box position={[1,1,0]}/>
      </Suspense>
      <axesHelper args={[5]}/>
      <Floor position={[0,-0.5,0]}/>
      <Suspense fallback={null}>
        <Background />
      </Suspense>
    </Canvas>
  );
}

export default App;
