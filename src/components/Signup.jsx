import React from 'react'
import { Form, Input, Button, Layout, Breadcrumb, Row, Col, Typography } from 'antd';
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Login.css'

const { Content } = Layout;
const { Title } = Typography;

function Login() {
    const onFinish = (values) => {
        axios.post("http://localhost:8000/api/signup/", values).then(res => {
            console.log(res.data)
        }).catch(e => {
            console.log(e.response.data);
        })
    };
    return (
        <Content style={{ padding: '0 10px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Sign Up</Breadcrumb.Item>
            </Breadcrumb>

            <div className="site-layout-content">
                <Title level={1} style={{ textAlign: "center" }}>Sign Up </Title>
                <Row justify='center'>
                    <Col span={24} lg={12}>
                        <Form
                            name="login"
                            className="login-form"
                            onFinish={onFinish}
                        >
                            <Form.Item name="fname" label="First Name">
                                <Input placeholder='First Name' />
                            </Form.Item>
                            <Form.Item name="lname" label="Last Name">
                                <Input placeholder='Last Name' />
                            </Form.Item>
                            <Form.Item
                                label="Student ID"
                                name="studentID"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Student ID',
                                    },
                                ]}
                            >
                                <Input placeholder="Student ID" />
                            </Form.Item>
                            <Form.Item
                                label="E-mail"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                    {
                                        type: "email",
                                        message: "Not a valid email"
                                    }
                                ]}
                            >
                                <Input placeholder="E-mail" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        min: 8
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="c_password"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>


                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Sign Up
                                </Button>
                                Or <Link to="/signin">Sign In</Link>
                            </Form.Item>
                        </Form>

                    </Col>
                </Row>
            </div>
        </Content>
    )
}

export default Login
