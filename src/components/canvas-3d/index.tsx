import lec3d from '@trickle/lec3d'
import styles from './index.module.css'
import { useEffect, useLayoutEffect, useRef } from 'react'
import ReactDOM from 'react-dom'


const Canvas3d = () => {
    const canvas3dWrapperRef = useRef<HTMLDivElement>(null)


    const elementMixer = () => {
        ReactDOM.render()
    }



    useLayoutEffect(() => {
        const lec = lec3d.init({
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
        lec.addControls({})



        if (canvas3dWrapperRef.current) {
            lec.mountTo(canvas3dWrapperRef.current)
        }
    }, [])

    useEffect(() => {

    })


    return (
        <div ref={canvas3dWrapperRef} className={styles['canvas-3d-wrapper']}>

        </div>
    )
}

export default Canvas3d