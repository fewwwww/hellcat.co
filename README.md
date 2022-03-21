# react-three-fiber && use-cannon syntax

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

- texture: some of them need to be corrected on the width and height
```
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
```

## Hooks

-useRef: get/modify latest value of DOM element
```
function TextRef() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

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

- useLoader: load assets asnycly, so we need suspense
```
const Box = () => {

  const texture = useLoader(
    THREE.TextureLoader, '/wood.jpeg'
  )
  
  return (
    <mesh />
      <meshPhysicalMaterial map={texture}/>
    </mesh>
  )
}

function App() {

  return (
    <Canvas />
      <Suspense fallback={null}>
        <Box />~~~~
      </Suspense>
    </Canvas>
  );
}
```

- useBox: physical box

```
const Floor = props => {
  const [ref, api] = useBox(() =>
    ({
      args: [15,2,10],
      ...props
    })
  )

  return (
    <mesh {...props}>
      <boxBufferGeometry args={[15,1,10]}/>
      <meshPhysicalMaterial />
    </mesh>
  )
}
```

## Events

onPointerDown: click the obj
```
<mesh onPointerDown={e => {console.log(e)}}>
```

onPointerEnter/onPointerLeave: just like hover
```
<mesh onPointerEnter={e => {e.object.scale.x = 1.5}>
```
