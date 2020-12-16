import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd'
import './login.scss';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import { client } from '../../config';
import { Provider, useSelector } from 'react-redux';
import { store } from '../../redux/store';

function Login() {

    const [loginSuccess, setLoginSuccess] = useState(false);
    const [registerButton, setRegisterButton] = useState(false);

    const onFinish = values => {
        console.log('Success:', values);
        client.authenticate({
            strategy: 'local',
            email: values.email,
            password: values.password,
        }).then((res) => {
            console.log({ res })
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

    if (loginSuccess) {
        return <Redirect
            to={{ pathname: "/dashboard" }}
        />
    }

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
                            <span>Username</span>
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
                    <Button onClick={onclicked} style={{ borderRadius: 10 }} htmlType="submit" className="submit">Register</Button>

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