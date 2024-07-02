import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row, Button, message, Form, Input } from 'antd';

function SignUp(props) {
    const { setSignMode } = props;
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const onSignup = async (values) => {

        setLoading(true);
        // console.log('Received values of Sign Up form: ', values);
        try {
            const response = await fetch('http://localhost:4000/SignUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            
            if (!response.ok) {
                throw new Error('Failed to sign up');
            }

            const data = await response.json();
            success();
            // message.success('User registered successfully');
            // console.log(data); // Log the response data if needed
        } catch (error) {
            console.error('Error signing up:', error.message);
            message.error('Failed to sign up');
        } finally {
            setLoading(false);
        }
        // Replace with actual login logic
    };



    const success = (f_name) => {
        messageApi.open({
            type: 'success',
            content: f_name + ' : Sign Up successfully!!',
            duration: 3,
        });
        setTimeout(() => setSignMode('SignIn'), 1000);  // Adjusted the timeout to 1 second for demonstration
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onSignup}
        >

            {contextHolder}
            <h1 className='text-title'>Sign Up</h1>
            <Form.Item
                name="f_name"
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
            </Form.Item>

            <Form.Item
                name="s_name"
                rules={[{ required: true, message: 'Please input your sure name!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Sure Name" />
            </Form.Item>


            <Form.Item
                name="email"
                rules={[
                    {
                        validator: (_, value) => {
                            if (!value) {
                                return Promise.reject('Please input your Email!');
                            }
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(value)) {
                                return Promise.reject('Please enter a valid Email!');
                            }
                            return Promise.resolve();
                        }
                    }
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="phone"
                rules={[
                    {
                        validator: (_, value) => {
                            if (!value) {
                                return Promise.reject('Please input your  Phone number!');
                            }
                            const phoneRegex = /^\+?[0-9]{8,14}$/; // Allow both with and without '+'
                            if (!phoneRegex.test(value)) {
                                return Promise.reject('Please enter a valid  Phone number!');
                            }
                            return Promise.resolve();
                        }
                    }
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Phone number" />
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

                <Button type="primary" htmlType="submit" className="login-form-button" danger>
                    Sign Up
                </Button>
                <p className='text-normal'>Back to <a href="#" onClick={() => setSignMode('SignIn')}>Sign In!</a></p>
            </Form.Item>
        </Form>
    )
}

export default SignUp