import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd'
import './login.scss';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import "antd/dist/antd.css";

import { client } from '../../config';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from '../../redux/store';
import { setLoginState } from '../../redux/actions';

function Login() {

    const dispatch = useDispatch();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [registerButton, setRegisterButton] = useState(false);
    const isAuthenticated = useSelector(state => state.authReducer.isLoggedIn);

    const onFinish = values => {
        console.log('Success:', values);
        client.authenticate({
            strategy: "local",
            email: values.email,
            password: values.password,
        }).then((res) => {
            console.log({ res })
            dispatch(setLoginState(true));
        }).catch(e => {
            // Show login page (potentially with `e.message`)
            console.error('Authentication error', e);
        });
        setLoginSuccess(true);

    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const onclicked = () => {
        setRegisterButton(true);
    };




    if (registerButton) {
        return <Redirect
            to={{ pathname: "/register" }}
        />
    }

    if (isAuthenticated) {
        console.log({ isAuthenticated });
        return <Redirect
            to={{ pathname: "/dashboard" }}
        />
    }


    if (loginSuccess) {
        return <Redirect
            to={{ pathname: "/dashboard" }}
        />
    }
    console.log({ isAuthenticated });
    return (
        <div>
            <div className="cont">
                <div >
                    <Form
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <h2>Welcome back,</h2>
                        <label>
                            <span>Email</span>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}>
                                <input />
                            </Form.Item>
                        </label>
                        <label>
                            <span>Password</span>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <input type="password" />
                            </Form.Item>
                        </label>
                        <p className="forgot-pass">Forgot password?</p>
                        <Button style={{ borderRadius: 10 }} htmlType="submit" className="submit">Sign In</Button>
                    </Form>
                    <p>If you dont have account <a onClick={onclicked}>REGISTER</a> first!</p>
                </div>
                <div className="sub-cont">
                    <div className="img">
                    </div>
                </div>
            </div>




        </div>




    );
}

export default Login;