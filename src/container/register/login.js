import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SiderDemo from './admin';

function Login(props) {


    return (
        <div>
            <Link to="/dashboard">
                <button type="button">Button</button>
            </Link>

        </div>
    );
}

export default Login;