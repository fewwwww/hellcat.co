import {Canvas, useFrame, useThree, extend} from 'react-three-fiber';
import {useRef} from 'react';
import {
  OrbitControls
} from "three/examples/jsm/controls/OrbitControls";
extend({OrbitControls})

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
    <mesh ref={ref} {...props}>
      <boxBufferGeometry />
      <Orbit />
      <meshBasicMaterial color='blue'/>
    </mesh>
  )
}
function App() {

  return (
    <Canvas style={{height:'100vh', width: '100vw', background: 'black'}}
    camera={{position: [3, 3, 3]}}>
      <Box position={[1,1,0]}/>
      <axesHelper args={[5, ]}/>
    </Canvas>
  );
}

export default App;
