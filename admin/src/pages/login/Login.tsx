import React from "react"
import './login.scss'

import ImgBackground from "../../components/imgBackground/ImgBackground"
import LoginForm from "./LoginForm"

const Login: React.FC = () => {
    return(
        <div className='login'>
            <div className="container">
                <ImgBackground />

                <div className="content">
                    <div className="welcome">
                        <h1 className="title">Login page</h1>
                        <h3 className="subtitle">Welcome to the Admin panel</h3>
                    </div>

                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Login