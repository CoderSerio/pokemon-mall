import styles from './index.module.css'
// 懒得做路由了，所以就用弹窗
// 四个状态——注册、登录、列表、详情
// 注册、登录是小窗
// 列表、详情是全屏
// 状态切换的时候要loading，小窗和大床之间切换要平滑缩放
const CommonModal = () => {

    return (
        <div className={styles['common-modal-wrapper']}>
            CommonModal
            <div>123</div>
            <input type="text" />
        </div>
    )
}

export default CommonModal