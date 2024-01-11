import React from 'react';
import logo from './assets/logo.jpg';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { byIdObj } from './api';

const NavbarAdmin = () => {

    const goProduct = () => byIdObj("goProduct").click();
    const goUser = () => byIdObj("goUser").click();
    return (
        <>
            <Link to="/user" id='goUser'></Link>
            <Link to="/product" id='goProduct'></Link>
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
                        paddingRight: "1.5rem",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        letterSpacing: "1px",
                    }}>
                    <Button onClick={goUser} outline color='info' className='me-4 text-white fw-bold'>User</Button>
                    <Button onClick={goProduct} outline color='info' className='text-white fw-bold'>Product</Button>
                </div>
            </div>
        </>
    )
}

export default NavbarAdmin