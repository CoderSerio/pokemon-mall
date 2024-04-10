import { useEffect, useLayoutEffect, useRef } from 'react'
import styles from './index.module.css'


const mockData = [
    {},
    {},
    {}
]

const GoodsList = () => {
    const goodsListWrapperRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        let opacity = 0
        const update = () => {
            if (goodsListWrapperRef.current && opacity <= 1) {
                goodsListWrapperRef.current.style.opacity = opacity.toString()
                opacity += 0.001
                requestAnimationFrame(update)
            }
        }
    }, [])

    return (
        <div ref={goodsListWrapperRef} className={styles['goods-list-wrapper']}>
            {mockData.map((item) => {
                return (
                    <div className={styles['card-item-wrapper']}>
                        商品
                    </div>
                )
            })}
        </div>
    )
}

export default GoodsList