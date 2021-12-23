import { Form, Input, Button, Layout, Breadcrumb, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom'
import './Login.css'
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../axios';

const { Content } = Layout;
const { Title } = Typography;

function Login() {
    const onFinish = (values) => {
        axios.post("http://localhost:8000/api/signin/", values)
            .then(res => {
                console.log(res.data);
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                window.location.href = "/";


            })
            .catch(e => {
                console.log(e.response);
            })
    };
    return (
        <Content style={{ padding: '0 10px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Login</Breadcrumb.Item>
            </Breadcrumb>

            <div className="site-layout-content">
                <Title level={1} style={{ textAlign: "center" }}>Sign In </Title>
                <Row justify='center'>
                    <Col span={24} lg={12}>
                        <Form
                            name="login"
                            className="login-form"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="studentID"
                                label="Student ID"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Student ID!',
                                    },
                                ]}
                            >
                                <Input placeholder="Student ID" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Password"
                                />
                            </Form.Item>


                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Sign in
                                </Button>
                                Or <Link to="/signup">Sign Up</Link>
                            </Form.Item>
                        </Form>

                    </Col>
                </Row>
            </div>
        </Content>
    )
}

export default Login
