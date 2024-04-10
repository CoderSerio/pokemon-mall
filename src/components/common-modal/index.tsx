import { useState } from 'react'
import styles from './index.module.css'
import Login from '../login'

// 懒得做路由了，所以就用弹窗
// 四个状态——注册、登录、列表、详情
// 注册、登录是小窗
// 列表、详情是全屏
// 状态切换的时候要loading，小窗和大床之间切换要平滑缩放

enum CARD_STATUS_STEP {
    LOADING = 0,
    LOGIN = 1,
    LIST = 2,
    DETAIL = 3
}

interface CommonModalProps {
    changeSize: () => void
}

const CommonModal = ({ changeSize }: CommonModalProps) => {
    const [cardStatusStep, setCardStatusStep] = useState(CARD_STATUS_STEP.LOGIN)

    return (
        <div className={styles['common-modal-wrapper']}>
            <div className={styles['content']}>
                {cardStatusStep === CARD_STATUS_STEP.LOGIN && <Login handleClick={() => {
                    setCardStatusStep(CARD_STATUS_STEP.LOADING)
                    changeSize()
                }}></Login>}
                {cardStatusStep === CARD_STATUS_STEP.LOADING && <div>加载中</div>}
                {/* {cardStatusStep === CARD_STATUS_STEP.LIST && <div>LIST</div>} */}
            </div>
        </div>
    )
}

export default CommonModal