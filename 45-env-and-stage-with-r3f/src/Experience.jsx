import { useFrame } from '@react-three/fiber'
import { Stage, Lightformer, Environment, Sky, ContactShadows, RandomizedLight, AccumulativeShadows, SoftShadows, BakeShadows, useHelper, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'


export default function Experience() {
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)
    const cube = useRef()

    const { color, opacity, blur } = useControls('contact Shadows',
        {
            color: '#000000',
            opacity: { value: 0.4, min: 0, max: 1 },
            blur: { value: 2.8, min: 0, max: 10 }
        })
    const { sunPosition } = useControls('sky',
        {
            sunPosition: { value: [1, 2, 3] },
        })
    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('environment map', {
        envMapIntensity: { value: 7, min: 0, max: 12 },
        envMapHeight: { value: 7, min: 0, max: 100 },
        envMapRadius: { value: 28, min: 0, max: 1000 },
        envMapScale: { value: 100, min: 0, max: 1000 }

    })


    useFrame((state, delta) => {
        // const time = state.clock.elapsedTime
        // cube.current.position.x = 2 + Math.sin(time)
        cube.current.rotation.y += delta * 0.2
    })

    /* we can also place <color> in the index.jsx*/
    //Make the shadow-camera size on the light big, and it makes soft shadows
    //Soft shadows modify shader behaviors, might mess with shaders

    //<BakeShadows/> to get the first shadow (spinning items do not have a spinning shadow)
    //accumalative shadows can only be rendered on a plane
    //<SoftShadows frustum={ 3.75 } size={ 0.005 } near={ 9.5 } samples={ 17 } rings={ 11 } />
    //frames in accumlativeShadows will take more time, with more frames
    //Contact shadows does not rely on threejs shadows
    //Add frames to contact shadow to bake 
    //!!IMPORTANT SUN POSITION NEEDS SPHERICAL COORDS (spherical => vector => setFromSpherical)
    //environment has presets
    //env file files={'./environmentMaps/the_sky_is_on_fire_2k.hdr'}
    //make resoultion small if not using background (resolution={32})
    return <>

        {/* <Environment background preset='sunset'
            ground={{
                height: envMapHeight,
                radius: envMapRadius,
                scale: envMapScale
            }}>


            <color args={['#000000']} attach={'background'} />
            <Lightformer 
            position-z={- 5} 
            scale={10}
            color={"red"}
            intensity={10}
            form="ring"
             /> 
             <mesh position-z={-5} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color={[5,0,0]} />
            </mesh> 
        </Environment> */}

        <color args={['ivory']} attach={'background'} />
        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <AccumulativeShadows position={[0, -0.99, 0]}
            color='#316d39'
            opacity={0.8}
            frames={Infinity}
            temporal
            blend={100} >
            <RandomizedLight ref={directionalLight}
                   amount={ 8 }
                   radius={ 1 }
                   ambient={ 0.5 }
                   intensity={ 1 }
                   position={ [ 1, 2, 3 ] }
                   bias={ 0.001 }
            />
        </AccumulativeShadows> */}

        {/* <ContactShadows position={[0, 0, 0]}
            scale={10}
            resolution={512}
            far={5}
            color={color}
            opacity={opacity}
            blur={blur} /> */}

        {/* <directionalLight ref={directionalLight}
            castShadow
            position={sunPosition}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={4}
            shadow-camera-right={4}
            shadow-camera-bottom={- 4}
            shadow-camera-left={- 4}
        />
        <ambientLight intensity={0.5} />
        <Sky sunPosition={sunPosition}/> */}


        {/* <mesh castShadow position-y={1} position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
        </mesh>

        <mesh castShadow ref={cube} position-y={1} position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
        </mesh> */}

        {/* <mesh position-y={0} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} />
        </mesh> */}
        <Stage shadows={{type:'contact', opacity:0.2, blur:3}}
        environment="sunset"
        preset='portrait'>
            <mesh castShadow position-y={1} position-x={- 2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
            </mesh>

            <mesh castShadow ref={cube} position-y={1} position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
            </mesh>
        </Stage>



    </>
}