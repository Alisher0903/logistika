import React from 'react';
import logo from './assets/logo.jpg';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { byIdObj } from './api';

const NavbarAdmin = () => {

    const goUser = () => byIdObj("goUser").click();
    return (
        <>
        <Link to="/user" id='goUser'></Link>
            <div
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#5AA0D2",
                    position: "sticky",
                    top: "0"
                }}>
                <img src={logo} alt="brand" width="250" />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingRight: "7.5rem",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        letterSpacing: "1px",
                    }}>
                    <Button onClick={goUser} outline color='info' className='text-white fw-bold'>User</Button>
                </div>
            </div>
        </>
    )
}

export default NavbarAdmin