import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import "./login.scss";
import { Redirect } from "react-router-dom";
import { client } from "../../config";

import { v4 as uuidv4 } from "uuid";

function Register(props) {
  const [signIn, setsignIn] = useState(false);

  const onFinishRegister = (values) => {
    // console.log('Success:', values);
    const info = {
      email: values.email,
      password: values.password,
      name: values.name,
      role: 0,
      employeeId: uuidv4(),
    };
    console.log("data", { info });
    client
      .service("users")
      .create(info)
      .then((res) => {
        console.log(res);
        props.history.push("/");
      })
      .catch((e) => console.log({ e }));
  };

  const onFinishFailedRegister = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onclicked = () => {
    setsignIn(true);
  };
  if (signIn) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <div>
      <div className='cont'>
        <div>
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishRegister}
            onFinishFailed={onFinishFailedRegister}
          >
            <h2>Register A user</h2>
            <label>
              <span>Email</span>
              <Form.Item
                name='email'
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <input />
              </Form.Item>
            </label>
            <label>
              <span>UserName</span>
              <Form.Item
                name='name'
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <input />
              </Form.Item>
            </label>
            <label>
              <span>Password</span>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <input type='password' />
              </Form.Item>
            </label>
            <p className='forgot-pass'>Forgot password?</p>
            <Button
              style={{ borderRadius: 10 }}
              htmlType='submit'
              className='submit'
            >
              Register
            </Button>
          </Form>
          <p>
            If you have account than <a onClick={onclicked}>Login</a>!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
