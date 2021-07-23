# react-three-fiber syntax

## Basic

- structure: write mesh at TOF, put it at EOF

```
const Box = () => {

  return (
    <mesh>
      ...
    </mesh>
  )
}

function App() {

  return (
    <Canvas>
      <Box />
    </Canvas>
  );
}
```

- passing property: due to last tip, we pass property like this
```
const Box = (props) => {

  return (
    <mesh {...props}>
      ...
    </mesh>
  )
}

function App() {

  return (
    <Canvas>
      <Box position={[0,0,0]}/>
    </Canvas>
  );
}
```


- constructor: init the element
```
<sphereGeometry args={[1, 32]} />
```

- args: pass args to element
```
<mesh position={[1, 2, 3]} />
  <meshStandardMaterial color="hotpink" />
```

- bind to parent: native elements ending with "Material" or "Geometry" receive attach automatically
```
<fog attach='fog'/>
```

## Hooks

- useFrame: render new stuff in 60 fps
```
const Box = (props) => {
  const ref = useRef()

  useFrame(state => {
    ref.current.rotation.y += 0.02
  })

  return (
    <mesh ref={ref} >
```

- useThree: access to the state model with all stuff defaulted
```
const Orbit = () => {
  const {camera, gl} = useThree()
  return (
    <orbitControls args={[camera, gl.domElement]}/>
  )
}
```
