import lec3d from '@trickle/lec3d'
import styles from './index.module.css'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import CommonModal from '../common-modal'
import { AnimationMixer, LoopOnce } from 'three'
import Loading from '../login'


interface Canvas3dProps {
    close: () => void
}

const Canvas3d = ({ close }: Canvas3dProps) => {
    const canvas3dWrapperRef = useRef<HTMLDivElement>(null)
    const lecRef = useRef<any>(null)
    const css3dRef = useRef<any>(null)
    const card3dObjRef = useRef<any>(null)


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
        // lecRef.current.addControls({})
        css3dRef.current = lec3d.initCss3d({
            scene: lecRef.current.scene,
            camera: lecRef.current.camera,
        });
        lecRef.current.camera.position.set(0, 70, 600)
        lecRef.current.camera.lookAt(0, 0, 0)
        lecRef.current.camera.far = 2000
        // lecRef.current.camera.near = 0
        lecRef.current.camera.updateProjectionMatrix();
    }

    const elementMixer = (jsx: JSX.Element) => {
        const div = document.createElement("div");
        let size = 0
        let a = 0.02
        div.style.width = '0'
        div.style.height = '0'
        div.style.transform = 'translateZ(0)'
        ReactDOM.createRoot(div).render(jsx);
        const css3dObj = css3dRef.current.createCss3dObject({ element: div });
        css3dObj.position.set(0, 0, 0)
        const timerId = setTimeout(() => {
            const expand = () => {
                size += a
                a += 0.02
                div.style.width = `${Math.floor(size * 2)}px`
                div.style.height = `${Math.floor(size * 2)}px`
                css3dObj.rotation.y = size / 35
                css3dObj.position.x = size
                css3dObj.position.z = size / 10
                css3dObj.position.y = size + 50
                lecRef.current.camera.position.z += size / 30
                lecRef.current.camera.lookAt(css3dObj.position)
                lecRef.current.camera.updateProjectionMatrix();

                if (size < 200) {
                    requestAnimationFrame(expand)
                }

            }
            expand()

            clearTimeout(timerId)
        }, 4500)

        card3dObjRef.current = css3dObj
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

    // 登录成功就调用这个函数
    const changeSize = () => {
        let size = 0
        const a = 0.01
        const update = () => {
            lecRef.current.camera.position.z -= size / 1.1
            lecRef.current.camera.position.y += size / 5
            lecRef.current.camera.position.x += size / 4

            lecRef.current.camera.rotation.y = -size / 7
            size += a
            if (lecRef.current.camera.position.z > card3dObjRef.current.position.z + 100) {
                // lecRef.current.renderer.setPixelRatio(window.devicePixelRatio);
                // lecRef.current.camera.updateProjectionMatrix();
                requestAnimationFrame(update)
            } else {
                const timerId = setTimeout(() => {
                    lecRef.current.unload()
                    close()
                    clearTimeout(timerId)
                }, 1000)
            }
        }
        update()
    }

    useEffect(() => {
        init()
        elementMixer(
            <CommonModal changeSize={changeSize}></CommonModal>
        )
        start()
        return () => {
            lecRef.current.unload()
        }
    }, [])


    return (
        <div ref={canvas3dWrapperRef} className={styles['canvas-3d-wrapper']}>

        </div>
    )
}

export default Canvas3d