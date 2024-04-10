import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './index.module.css'


const mockData = [
    {},
    {},
    {}
]

const GoodsList = () => {
    const goodsListWrapperRef = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState<boolean>(false)
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false)


    useLayoutEffect(() => {
        setTimeout(() => {
            if (goodsListWrapperRef.current) {
                setVisible(true)
            }
        }, 1000)
    }, [])

    const showDetail = () => {
        setShowDetailModal(true)
    }


    return (
        <div ref={goodsListWrapperRef} className={`${styles['goods-list-wrapper']} ${visible ? styles['visible'] : ''}`}>
            {mockData.map((item) => {
                return (
                    <div onClick={showDetail} className={styles['card-item-wrapper']}>
                        商品
                    </div>
                )
            })}
            <div className={`${styles['detail-modal']} ${showDetailModal ? styles['visible'] : ''}`}>
                <div onClick={() => { setShowDetailModal(false) }} className={styles['close-icon']}>x</div>
                商品详情
            </div>
        </div>
    )
}

export default GoodsList