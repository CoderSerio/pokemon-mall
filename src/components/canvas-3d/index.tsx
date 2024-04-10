import lec3d from '@trickle/lec3d'
import styles from './index.module.css'
import { useEffect, useLayoutEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import CommonModal from '../common-modal'
import { AnimationMixer, LoopOnce } from 'three'

const Canvas3d = () => {
    const canvas3dWrapperRef = useRef<HTMLDivElement>(null)
    const lecRef = useRef<any>(null)
    const css3dRef = useRef<any>(null)


    const init = () => {
        lecRef.current = lec3d.init({
            axesHelperConfigs: {
                length: 10000,
            },
            lightConfigs: {
                color: 'white'
            },
            rendererConfigs: {
                backgroundColor: 'pink'
            }
        })
        css3dRef.current = lec3d.initCss3d({
            scene: lecRef.current.scene,
            camera: lecRef.current.camera,
        });

        const controls = lecRef.current.addControls({})
        controls.enableZoom = true

        lecRef.current.camera.position.set(0, 50, 500)
        lecRef.current.camera.lookAt(0, 0, 0)
        // lecRef.current.renderer.setPixelRatio(window.devicePixelRatio);
        // lecRef.current.camera.updateProjectionMatrix();
    }

    const elementMixer = (jsx: JSX.Element) => {
        const div = document.createElement("div");
        let size = 0
        let a = 0.02
        div.style.width = '0'
        div.style.height = '0'
        ReactDOM.createRoot(div).render(jsx);
        const css3dObj = css3dRef.current.createCss3dObject({ element: div });
        css3dObj.position.set(0, 0, 0)
        setTimeout(() => {
            const expand = () => {
                size += a
                a += 0.02
                div.style.width = `${size}px`
                div.style.height = `${size * 3 / 2}px`
                css3dObj.rotation.y = size / 35
                css3dObj.position.x = size
                css3dObj.position.z = size / 10
                css3dObj.position.y = size + 50
                if (size < 200) {
                    requestAnimationFrame(expand)
                }
            }
            expand()
        }, 4500)
        lecRef.current.scene.add(css3dObj);
    }

    const start = async () => {
        const { gltf, model } = await lec3d.loadGLTF({
            modelPath: 'pokeball_loader/scene.glb',
            options: {
                scale: 1000,
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            }
        })
        const mixer = new AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.loop = LoopOnce;
        action.clampWhenFinished = true; // 冻结在最后一帧
        action.timeScale = 1;
        lecRef.current.scene.add(model)

        const playAnimation = () => {
            const speed = 0.01
            mixer.update(speed);
            requestAnimationFrame(playAnimation);
        };
        const timer = setTimeout(() => {
            action.play()
            playAnimation();
            clearTimeout(timer)
        }, 2000)

        if (canvas3dWrapperRef.current) {
            lecRef.current.mountTo(canvas3dWrapperRef.current)
            css3dRef.current.mountTo(canvas3dWrapperRef.current)
        }
    }

    useEffect(() => {
        init()
        elementMixer(<CommonModal></CommonModal>)
        start()
        return () => {
            lecRef.current.unload()
        }
    }, [])



    useLayoutEffect(() => {

    }, [])



    return (
        <div ref={canvas3dWrapperRef} className={styles['canvas-3d-wrapper']}>

        </div>
    )
}

export default Canvas3d