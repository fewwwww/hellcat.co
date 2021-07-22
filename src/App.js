import {Canvas, useFrame} from 'react-three-fiber';
import {useRef} from 'react';

const Box = () => {
  const ref = useRef()

  useFrame(state => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.02
  })

  return (
    <mesh ref={ref}>
      <boxBufferGeometry />
      <meshBasicMaterial color='blue'/>
    </mesh>
  )
}
function App() {

  return (
    <Canvas style={{height:'100vh', width: '100vw'}}>
      <Box />
    </Canvas>
  );
}

export default App;
