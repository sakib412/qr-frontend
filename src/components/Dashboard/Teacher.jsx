import React, { useContext, useEffect, useState } from 'react'
import { Layout, Breadcrumb, Row, Col, Typography, Card, Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../axios';

const { Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

function TeacherDashboard() {
    const [authState] = useContext(AuthContext);
    // const [studentAttendence, setStudentAttendence] = useState([]);
    const [allAttendence, setAllAttendence] = useState([]);

    const seeQR = (qr) => {
        Modal.info({
            icon: null,
            content: <img src={qr} alt="" width="80%" />,
            width: "65%",
            closable: true,
            afterClose: () => {
                window.location.reload()
            }
        })

    }
    const seeStudent = (student) => {
        Modal.info({
            icon: null,
            content: <ul>{student.map(s => <li key={s.id}>{s.username}</li>)}</ul>,
            width: "40%"
        })
    }

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: text => <>{text}</>,
        },
        {
            title: 'Course Code',
            dataIndex: 'course_code',
            key: 'course_code',
            render: text => <>{text}</>,
        },
        {
            title: 'Section',
            dataIndex: 'section',
            key: 'section',
        },
        {
            title: 'Attended Student',
            dataIndex: 'attendence',
            key: 'attendence',
            // render: student => <ul>{student.map(s => <li key={s.id}>{s.username}</li>)}</ul>
            render: student => <> {student.length} {student.length ? <Button onClick={() => { seeStudent(student) }}>See All</Button> : null}</>
        },
        {
            title: 'QR',
            dataIndex: 'qr',
            key: 'qr',
            render: qr => <Button onClick={() => { seeQR(qr) }}>See QR</Button>
        },


    ];

    let data = [];
    allAttendence.forEach(attendence => {
        const attendData = {
            key: attendence.id,
            course_code: attendence.course_code,
            date: attendence.date,
            section: attendence.section,
            attendence: attendence.student,
            qr: attendence.qr
        }

        data.push(attendData)

    })

    const onCreate = (values) => {
        console.log(values.date.format("YYYY-MM-DD"));
        const body = {
            "section": values.section,
            "date": values.date.format("YYYY-MM-DD"),
            "course_code": values.course_code

        }
        axiosInstance.post("/attendence/", body)
            .then((res) => {
                seeQR(res.data.qr)
                console.log(res.data);
            })
            .catch(err => { console.log(err.response); })

    }
    useEffect(() => {
        if (authState && !authState.is_staff) {
            window.location.href = "/dashboard/student"
        }
    }, [authState])



    useEffect(() => {
        if (authState) {
            axiosInstance.get(`attendence/?teacher=${authState.id}`)
                .then(res => {
                    setAllAttendence(res.data.reverse());
                    console.log(res.data);
                })
                .catch(err => { console.log(err.response); })
        }
    }, [authState])



    return (
        <Content style={{ padding: '0 10px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>

            <div className="site-layout-content">
                <Title level={3} >Dashboard </Title>
                <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                    <Col span={24} lg={8}>
                        <Card
                            style={{ width: "100%" }}
                        >
                            <Meta
                                title={
                                    <div>
                                        <p>ID: {authState && authState.username}</p>
                                        <p>
                                            Name: {authState && authState.first_name} {authState && authState.last_name}
                                        </p>
                                        <p>Eamil: {authState && authState.email}</p>
                                    </div>
                                }
                            />
                        </Card>
                        <Card>
                            <Form
                                name="normal_login"
                                className="login-form"
                                onFinish={onCreate}
                            >
                                <Form.Item
                                    name="section"
                                    label="Section &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                                    rules={[{ required: true, message: 'Please input section Name' }]}
                                >
                                    <Input placeholder="Section" />
                                </Form.Item>
                                <Form.Item
                                    name="course_code"
                                    label="Course Code"
                                    rules={[{ required: true, message: 'Please input Course Code' }]}
                                >
                                    <Input placeholder="Course Code" />
                                </Form.Item>
                                <Form.Item
                                    name="date"
                                    label="Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                                    rules={[{ required: true, message: 'Please input Date' }]}
                                >
                                    <DatePicker />
                                </Form.Item>


                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Create Attendance
                                    </Button>
                                </Form.Item>




                            </Form>
                        </Card>
                    </Col>
                    <Col span={24} lg={16}>
                        <Table columns={columns} dataSource={data} />
                    </Col>

                </Row>


            </div>
        </Content>
    )
}

export default TeacherDashboard
