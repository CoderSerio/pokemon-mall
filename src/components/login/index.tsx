import styles from './index.module.css'
interface LoginProps {
    handleClick: () => void
}

const Login = ({ handleClick }: LoginProps) => {

    return (
        <div className={styles['login-wrapper']}>
            <div>这里先随便写写，后面补一下样式</div>
            <div>
                账号：<input type="text"></input>

            </div>
            <div>
                密码：<input type="text"></input>
            </div>
            <button style={{ background: 'skyblue', color: '#fff' }} onClick={handleClick}>登录/注册</button>
        </div>
    )
}

export default Login