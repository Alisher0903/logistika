import { Link } from 'react-router-dom';
import './login.css'

const Login = () => {
  return (
    <div className="login_section">
            <Link id="role" to=""></Link>
            <section className="login_section-box">
                <div className="login_box">
                    <div className="login_content">
                        <h2>Sign In</h2>
                        <div className="login_form">
                            <div className="login_inputBox" id="phoneNumber">
                                <input id="phone_number" required /> <i>Phone Number</i>
                            </div>
                            <div className="login_inputBox" id="oldPassword">
                                <input type="password" id="password" required /> <i>Password</i>
                            </div>
                            <div className="login_inputBox">
                                <button className="glow-on-hover">Sign in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
  )
}

export default Login;