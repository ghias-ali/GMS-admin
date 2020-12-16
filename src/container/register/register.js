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

function Register() {

    const [signIn, setsignIn] = useState(false);

    const onFinishRegister = values => {
        console.log('Success:', values);
        const { email, password } = values;
        client.service('/users').create({
            strategy: 'local',
            email,
            password
        }).then(res => console.log(res)).catch(e => console.log({ e }));

    };

    const onFinishFailedRegister = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const onclicked = () => {
        setsignIn(true);
    };
    if (signIn) {
        return <Redirect
            to={{ pathname: "/" }}
        />
    }


    return (
        <div>
            <div className="cont">
                <div>
                    <Form
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinishRegister}
                        onFinishFailed={onFinishFailedRegister}>
                        <h2>Register A user</h2>
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
                        <Button style={{ borderRadius: 10 }} htmlType="submit" className="submit">Register</Button>
                    </Form>
                    <Button onClick={onclicked} style={{ borderRadius: 10 }} htmlType="submit" className="submit">Sign In</Button>

                </div>
            </div >
        </div>

    );
}

export default Register;