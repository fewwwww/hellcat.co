(this["webpackJsonphellcat.co"]=this["webpackJsonphellcat.co"]||[]).push([[0],{32:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var c=n(1),i=n.n(c),o=n(22),r=n.n(o),s=(n(32),n(7)),a=n(19),l=n(4),j=n(6),d=n(8),b=n(23),h=n(24),u=n(0),p=n(38),f=n(25),g={activeMesh:{},activeMeshName:"object001_Material011_0",cameraPos:new u.Vector3(6,5,12),target:new u.Vector3(4,0,0),shouldUpdate:!0},O=n(3);Object(d.b)({OrbitControls:b.a,DragControls:h.a});var m=function(){var e=Object(d.e)(),t=e.camera,n=e.gl;return Object(O.jsx)("orbitControls",{attach:"orbitControls",args:[t,n.domElement]})},A=function(e){var t=Object(c.useRef)(),n=Object(c.useRef)(),i=Object(c.useState)([]),o=Object(j.a)(i,2),r=o[0],s=o[1],a=Object(d.e)(),l=a.camera,b=a.gl,h=a.scene;return Object(c.useEffect)((function(){s(t.current.children)}),[]),Object(c.useEffect)((function(){n.current.addEventListener("hoveron",(function(e){return h.orbitControls.enabled=!1})),n.current.addEventListener("hoveroff",(function(e){return h.orbitControls.enabled=!0})),n.current.addEventListener("dragstart",(function(e){var t;null===(t=e.object.api)||void 0===t||t.mass.set(0)})),n.current.addEventListener("dragend",(function(e){var t;return null===(t=e.object.api)||void 0===t?void 0:t.mass.set(1)})),n.current.addEventListener("drag",(function(e){var t,n;null===(t=e.object.api)||void 0===t||t.position.copy(e.object.position),null===(n=e.object.api)||void 0===n||n.velocity.set(0,0,0)}))}),[r]),Object(O.jsxs)("group",{ref:t,children:[Object(O.jsx)("dragControls",{transformGroup:e.transformGroup,ref:n,args:[r,l,b.domElement]}),e.children]})},x=function(e){return Object(O.jsxs)("mesh",Object(l.a)(Object(l.a)({},e),{},{children:[Object(O.jsx)("sphereBufferGeometry",{args:[.2,20,10]}),Object(O.jsx)("pointLight",{castShadow:!0,"shadow-mapSize-height":Math.pow(2,10),"shadow-mapSize-width":Math.pow(2,10),"shadow-radius":10}),Object(O.jsx)("meshPhongMaterial",{emissive:"yellow"})]}))},v=function(){return Object(O.jsxs)("div",{style:{position:"absolute",display:"flex",justifyContent:"space-between",width:"90vw",left:"5vw",zIndex:"1",top:"10px"},children:[Object(O.jsx)("div",{style:{fontSize:"50px"},children:"\ud835\udd8d\ud835\udd8a\ud835\udd91\ud835\udd91\ud835\udd88\ud835\udd86\ud835\udd99.\ud835\udd88\ud835\udd94"}),Object(O.jsx)("a",{href:"https://github.com/fewwwww/hellcat.co",children:Object(O.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAVJSURBVHic7Zt7aFZlHMc/O21lczdL22xSbW1zy0KTEiRrkjMJocAgwSLoQtKFFgh2g5IK7GZR7Z+yiNKEikTS7KJR2U0iBhaj6zCtbIllw62xdnn74/e+eXY8l+d3bu+B+sLvj5f3d/s+73me8zy/5/fCfxwlKcWZBDQDLXmpyUtF/vsB4E/gMPA98F1ehpNOLKkBOA64CFgELATmAWVKH38DnwMfAO8Bu4Dx2DJMCGcDjwG/ALmY5WfgUWBWamwUWABsRX6huIm7ycdARyrMAtAG7CQd0m7yLtCaOEsXnAg8gszTYpEvyDDwELLQpoJWYE+ChMJKD3BOgrwBuBoYLDJRPxkAViRFvpP0FrkoMg6siZN4CfBkBohp5Ym4BmBtBsiElQeikl+VARJRpTMs+YuB0QwQiCpjwGIvkl5ngXqgGzjFZ4BywA15HzOBS4DZPvpxIQfsRjZgvUAt8HCATR8wF/jVNMgOgkf2Mxe7OcCLwIiBvVaGgKeQU6UdFnDAwP4tU/IrDBN60MdHC/Cmi81PwCfANmBDnlAX8DKwHfgU+bWcdhuRp9ILmwxzvjKIfI1HAm6yPMgZsAy4F1gK1BnoFzADuBy4H7NDz12GOR8Aqvwc3WfoKAdcqiCUNG7FPO97vJxUAX8oHC1MgklIXIt53oeAyoKhZXOyEpiiCOr3hkgb0xS6JwM3Fj7YB+B6ZdAsVWbalPrHcJ2P/rW0K3y+seNb9PnPszt4Wmk8ihQ8s4Ll6AdgwmHpG6XxmmT5hMIz6Dj0FAzrlYYHsa2iGUId+mJNvQW0KwM9DhyJJ+dY0Qc8r7S50ALOUhptVuqniS1K/TYLXVl5L3JllVV8hNQFTdFmcezpyg+9unxSxwiwX6HfbAEnKQz6dPkUBZocp1gcvaE1wV/KZIqBQYVulXYAypXJFAOTFbqVFlIzM0W1MplioEahO2qhe6xPVyZTDDQodActoF9h0IS+0SFN1KI70vdb6F4b5aRT+Q2LC5T6+yzgR6XRUqV+mtCW6fZZwFdKo6uYWEjJCsqRIqwGX4LU9rRn6SviyDhmdKLnsQBkHzCsNOwlW3uCWqTYqeEwhHS6AGY3QU55IXFaZigF3kaf/3a7kzCPTw7pzUmr2dINpcBLLnmZyC12R3WEb3jajO7WJy40Au+HyDeHTPmpTodbQjrLIfNvJbY5lSCqgTuI1qv0qpvjRR7KG5HLhEbgJqQo4uX4d2AdsroeHyPpCmAJsB4peIQlXhDPDdNuF+WDDoPJwOsGQQaQHt8uZOBKFYQrgdXAc8g1fJzX7R/6BV7iYTQK3GnTK0PXIXq7gnwB62IkbZf2oMBbfYxvs+lNB34zCNhDuJ1jBeZX9ZHmvhNNeM+zEeBcm+5igt8eq9TUj6JLQS5I+oHTTAPf7ONom0O3He8WlTHgPA1jB5b55KGV6zSBS4A3fJzNd+hPAq4BnkUes/XIwjddE9QF5/vkEPuj70Q18LWHw3dIZwfY6BFfI3vQ1QknoBnvhWh1WKcKnOER21T2E0MZbzberTNrSbZPv8Ejron0If2LsWAO0mToFugH4G7kiu0Em00Z0rkRpXhypkfMINlLjOTtyZh0YhxGzgZj+c9RnpAmg3hO6QZOjRDTF5XAa8qEohROWpSxNkSMZ4QS5Cx9xDApzc2TEzMNYxxC/s2SKhpwb4d1im9nZgBaA3yPI6fVYtQj/kUH8AXeSWquqpxo8/G7A9koZQYdSEd2YfHLIdMkyk3SNCYehYeQxuq5kTK1IYnd3Azk7qARWTB3RvR3GXIZ0w28gvzJ+n/EhX8AXiVFMFuUCq4AAAAASUVORK5CYII=",alt:"https://github.com/fewwwww/hellcat.co"})})]})},w=function(e){var t,n=Object(d.d)(f.a,""+e.path);return n.animations.length>0&&(t=new u.AnimationMixer(n.scene),n.animations.forEach((function(e){t.clipAction(e).play()}))),Object(d.c)((function(e,n){var c;null===(c=t)||void 0===c||c.update(n)})),n.scene.traverse((function(e){e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0,e.material.side=u.FrontSide)})),Object(O.jsx)("primitive",Object(l.a)({object:n.scene},e))},y=function(e){var t=e.position,n=void 0===t?[0,0,0]:t,c=e.offset,i=void 0===c?[0,0,0]:c,o=e.dims,r=void 0===o?[1,1,1]:o,s=e.visible,a=void 0!==s&&s,l=e.children,d=Object(p.c)((function(){return{mass:1,args:r,position:n}})),b=Object(j.a)(d,2),h=b[0],u=b[1];return Object(O.jsxs)("group",{ref:h,api:u,children:[Object(O.jsxs)("mesh",{scale:r,visible:a,children:[Object(O.jsx)("boxBufferGeometry",{}),Object(O.jsx)("meshPhysicalMaterial",{wireframe:!0})]}),Object(O.jsx)("group",{position:i,children:l})]})},B=function(e){var t=Object(p.c)((function(){return Object(l.a)({args:[20,2,10]},e)})),n=Object(j.a)(t,2);n[0],n[1];return Object(O.jsxs)("mesh",Object(l.a)(Object(l.a)({},e),{},{receiveShadow:!0,children:[Object(O.jsx)("boxBufferGeometry",{args:[200,1,200]}),Object(O.jsx)("meshPhysicalMaterial",{transparent:!0,opacity:.2})]}))},C=function(e){var t=Object(d.d)(u.TextureLoader,"/bg.jpg"),n=Object(d.e)().gl,i=Object(c.useMemo)((function(){return new u.WebGLCubeRenderTarget(t.image.height).fromEquirectangularTexture(n,t)}),[]);return Object(O.jsx)("primitive",{object:i,attach:"background"})},k=function(e){return Object(a.a)(e),Object(d.c)((function(e){var t=e.camera,n=e.scene;(g.activeMesh.name!==g.activeMeshName&&(g.activeMesh=n.getObjectByName(g.activeMeshName)||{}),g.shouldUpdate)&&(t.position.lerp(g.cameraPos,.1),n.orbitControls.target.lerp(g.target,.1),n.orbitControls.update(),t.position.clone().sub(g.cameraPos).length()<.1&&(g.shouldUpdate=!1))})),null},M=function(e){Object(a.a)(e);var t={1:{cameraPos:[-15,3,9],target:[-4,0,0],name:"object028_Material005_0"},2:{cameraPos:[9,4,9],target:[4,0,0],name:"object001_Material011_0"}},n=function(e){var n,c;(n=g.cameraPos).set.apply(n,Object(s.a)(t[e].cameraPos)),(c=g.target).set.apply(c,Object(s.a)(t[e].target)),g.activeMeshName=t[e].name,g.shouldUpdate=!0};return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("button",{onClick:function(e){return n(1)},style:{zIndex:"1",position:"absolute",bottom:"10vh",left:"40vw",height:"50px",width:"50px",background:"white",textAlign:"center",borderRadius:"100%",fontSize:"30px",fontWeight:"900",opacity:"0.7",border:"1px solid black",cursor:"pointer"},children:"<"}),Object(O.jsx)("button",{onClick:function(e){return n(2)},style:{zIndex:"1",position:"absolute",bottom:"10vh",right:"40vw",height:"50px",width:"50px",background:"white",textAlign:"center",borderRadius:"100%",fontSize:"30px",fontWeight:"900",opacity:"0.7",border:"1px solid black",cursor:"pointer"},children:">"})]})},I=function(e){var t=function(e){g.activeMesh&&(g.activeMesh.material.color=new u.Color(e.target.style.background))};return Object(O.jsxs)("div",{style:{position:"absolute",zIndex:1,left:0,right:0,margin:"auto",width:"fit-content",display:"flex",top:"20px"},children:[Object(O.jsx)("div",{onClick:t,style:{background:"#de0f18",height:50,width:50}}),Object(O.jsx)("div",{onClick:t,style:{background:"black",height:50,width:50}}),Object(O.jsx)("div",{onClick:t,style:{background:"#fffff6",height:50,width:50}})]})};var S=function(){return Object(O.jsxs)("div",{style:{height:"100vh",width:"100vw"},children:[Object(O.jsx)(M,{}),Object(O.jsx)(I,{}),Object(O.jsx)(v,{}),Object(O.jsxs)(d.a,{shadowMap:!0,camera:{position:[10,10,10]},children:[Object(O.jsx)(k,{}),Object(O.jsx)("ambientLight",{intensity:.2}),Object(O.jsx)(m,{}),Object(O.jsx)("directionalLight",{position:[0,20,3],intensity:1,castShadow:!0}),Object(O.jsx)(x,{position:[-8,5,0]}),Object(O.jsx)(x,{position:[0,15,10]}),Object(O.jsx)(x,{position:[8,5,0]}),Object(O.jsxs)(p.a,{children:[Object(O.jsxs)(c.Suspense,{fallback:null,children:[Object(O.jsx)(A,{transformGroup:!0,children:Object(O.jsx)(y,{position:[4,2,0],dims:[3.2,1.7,7.5],offset:[0,-1.2,0],children:Object(O.jsx)(w,{path:"/dodge_challenger/scene.gltf",scale:[.015,.015,.015]})})}),Object(O.jsx)(A,{transformGroup:!0,children:Object(O.jsx)(y,{position:[-4,2,0],dims:[4,1.3,8.7],offset:[0,-.1,.5],children:Object(O.jsx)(w,{path:"/lamborghini_aventador_j/scene.gltf",scale:[.0085,.0085,.0085]})})}),Object(O.jsx)(w,{path:"/reap_the_whirlwind/scene.gltf",scale:[.008,.008,.008]})]}),Object(O.jsx)(B,{position:[0,-.5,0]})]}),Object(O.jsx)(c.Suspense,{fallback:null,children:Object(O.jsx)(C,{})})]})]})};r.a.render(Object(O.jsx)(i.a.StrictMode,{children:Object(O.jsx)(S,{})}),document.getElementById("root"))}},[[37,1,2]]]);
//# sourceMappingURL=main.5e4f597e.chunk.js.map