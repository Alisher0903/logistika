import React from 'react';
import logo from './assets/logo.jpg';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { byIdObj } from './api';

const NavbarLogOut = () => {

    const logOut = () => {
        byIdObj("logOut").click();
        sessionStorage.clear();
    }
    return (
        <>
            <Link to="/" id='logOut'></Link>
            <div
                style={{
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
                    <Button onClick={logOut} outline color='info' className='text-white fw-bold'>Log out</Button>
                </div>
            </div>
        </>
    )
}

export default NavbarLogOut