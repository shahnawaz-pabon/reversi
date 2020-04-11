import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../../assets/images/reversi.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

export default class Nav extends React.Component {
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home"
                    style={{
                        fontFamily: 'Ubuntu',
                        fontWeight: 'bold',
                        letterSpacing: 1
                    }}
                    >
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="app-logo"
                        />{' '}
                        Reversi Game
                    </Navbar.Brand>
                </Navbar>
            </>
        );
    }
}