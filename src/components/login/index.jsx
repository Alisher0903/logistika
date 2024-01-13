import { Link } from 'react-router-dom';
import './login.css';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { byIdObj, url } from '../api';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    byIdObj("roles").click();
  }, [role]);

  async function logIn() {
    // setIsLoading(true);
    let addData = {
      phoneNumber: byIdObj("phone_number").value,
      password: byIdObj("password").value,
    };

    await axios.post(`${url}user/login?phoneNumber=${addData.phoneNumber}&password=${addData.password}`)
      .then(res => {
        sessionStorage.setItem("jwtToken", "Bearer " + res.data.body);
        // sessionStorage.setItem("role", res.data.message);
        if (res.data.message === "ROLE_ADMIN") {
          toast.success("You have successfully logged in✔")
          setRole("/user");
        }
        else if (res.data.message === "ROLE_USER") {
          toast.success("You have successfully logged in✔")
          setRole("/about");
        }
      })
      .catch(() => {
        toast.error("Wrong number or password!");
      });
  }

  function checkKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      byIdObj("loginBtn").click();
    }
  }

  return (
    <div className="login_section">
      <Link id="roles" to={role}></Link>
      <section className="login_section-box">
        <div className="login_box">
          <div className="login_content">
            <h2>Sign In</h2>
            <div className="login_form">
              <div className="login_inputBox">
                <input id="phone_number" required /> <i>Phone Number</i>
              </div>
              <div className="login_inputBox">
                <input
                  onKeyDown={checkKeyPress}
                  id="password"
                  type={`${passwordShow ? 'password' : 'text'}`}
                  style={{ position: "relative" }} required /> <i>Password</i>
              </div>
              {passwordShow ?
                <Icon
                  onClick={() => {
                    setPasswordShow(false)
                  }}
                  icon="mdi:show"
                  style={{
                    position: "absolute",
                    right: "1rem",
                    bottom: "7.3rem",
                  }}
                  width="25"
                  color='black' />
                :
                <Icon
                  onClick={() => {
                    setPasswordShow(true)
                  }}
                  icon="mdi:hide"
                  style={{
                    position: "absolute",
                    right: "1rem",
                    bottom: "7.3rem",
                  }}
                  color="black"
                  width="25" />
              }
              <div className="login_inputBox">
                <button onClick={logIn} id='loginBtn' className="glow-on-hover">Sign in</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login;