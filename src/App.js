import {Canvas, useFrame, useThree, extend} from 'react-three-fiber';
import {useRef} from 'react';
import {
  OrbitControls
} from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three';
import {useTrimesh} from "use-cannon";
extend({OrbitControls});

const Orbit = () => {
  const {camera, gl} = useThree()
  return (
    <orbitControls args={[camera, gl.domElement]}/>
  )
}

const Box = (props) => {
  const ref = useRef()

  useFrame(state => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.02
  })

  return (
    <mesh ref={ref} {...props} castShadow receiveShadow>
      <boxBufferGeometry />
      <Orbit />
      <meshPhysicalMaterial color='blue'/>
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
function App() {

  return (
    <Canvas
      shadowMap
      style={{height:'100vh', width: '100vw', background: 'black'}}
      camera={{position: [3, 3, 3]}}
    >
      <ambientLight intensity={0.2} />
      <Bulb position={[1,3,1]}/>
      <Box position={[1,1,0]}/>
      <axesHelper args={[5, ]}/>
      <Floor position={[0,-0.5,0]}/>
    </Canvas>
  );
}

export default App;
