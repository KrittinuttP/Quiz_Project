import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row, Button, Checkbox, Form, Input, message } from 'antd';

function SignIn(props) {
    const { setSignMode, UserAuth, setUserAuth } = props;
    const [messageApi, contextHolder] = message.useMessage();

    // useEffect(() => {
    const SignIn = async (user, password) => {
        try {
            const res = await fetch(`http://localhost:4000/SignIn?user=${user}&password=${password}`);
            if (!res.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await res.json();
            const userSign = data.user
            setUserAuth(userSign)
            success(userSign.firstName);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    // fetchData();
    // }, [])

    const onFinish = (values) => {
        SignIn(values.email, values.password)
        // console.log('Received values of form: ', values);
        // Replace with actual login logic
    };

    const success = (f_name) => {
        messageApi.open({
            type: 'success',
            content: 'Hi ' + f_name + ' your welcome!!',
            duration: 3,
        });
        setTimeout(() => setSignMode('Home'), 1000);  // Adjusted the timeout to 1 second for demonstration
    };


    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >

            {contextHolder}
            <h1 className='text-title'>Sign In</h1>
            <Form.Item
                name="email"
                rules={[
                    {
                        validator: (_, value) => {
                            if (!value) {
                                return Promise.reject('Please input your Email or Phone number!');
                            }
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            const phoneRegex = /^\+?[0-9]{8,14}$/; // Allow both with and without '+'
                            if (!emailRegex.test(value) && !phoneRegex.test(value)) {
                                return Promise.reject('Please enter a valid Email or Phone number!');
                            }
                            return Promise.resolve();
                        }
                    }
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email or Phone number" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        validator: (_, value) => {
                            if (!value) {
                                return Promise.reject('Your password must contain between 4 and 60 characters.');
                            }
                            if (value && (value.length < 4 || value.length > 60)) {
                                return Promise.reject('Your password must contain between 4 and 60 characters.');
                            }
                            return Promise.resolve(); // No validation error
                        }
                    }
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

            </Form.Item>

            <Form.Item>

                <Button type="primary" htmlType="submit" className="login-form-button" danger>
                    Log in
                </Button>
                <p className='text-normal'>Create user? <a href="#" onClick={() => setSignMode('SignUp')}>Sign up now!</a></p>
            </Form.Item>
        </Form>

    )
}

export default SignIn