import React, { useContext, useEffect, useState } from 'react'
import { Layout, Breadcrumb, Row, Col, Typography, Card, Table, Button } from 'antd';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../axios';

const { Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

function StudentDashboard() {
    const [authState] = useContext(AuthContext);
    const [studentAttendence, setStudentAttendence] = useState([]);
    const [allAttendence, setAllAttendence] = useState([]);
    const columns = [
        {
            title: 'Course Code',
            dataIndex: 'course_code',
            key: 'course_code',
            render: text => <>{text}</>,
        },
        {
            title: 'Attendence',
            dataIndex: 'attendence',
            key: 'attendence',
        },
        {
            title: 'Marks',
            dataIndex: 'marks',
            key: 'marks',
        },

    ];

    let data = [];
    const courses = studentAttendence ? [...new Set(studentAttendence.map(item => item.course_code))] : [];
    console.log(courses);

    const studentAttendenceCopy = [...studentAttendence];

    studentAttendenceCopy.forEach((attendence) => {
        const attendLength = studentAttendence.filter((a) => a.course_code === attendence.course_code).length
        const allLength = allAttendence.filter((a) => a.course_code === attendence.course_code).length
        const attendData = {
            key: attendence.id,
            course_code: attendence.course_code,
            marks: Number((attendLength * 7) / allLength).toFixed(2),
            attendence: `${attendLength}/${allLength}`
        }
        data.push(attendData);

    })
    data = Object.values(
        data.reduce((c, e) => {
            if (!c[e.course_code]) c[e.course_code] = e;
            return c;
        }, {})
    );

    useEffect(() => {
        axiosInstance.get("/attendence/user/")
            .then(res => {
                console.log(res.data);
                setStudentAttendence(res.data.student);
                setAllAttendence(res.data.all);
            })
            .catch(err => { console.log(err.response); })
    }, [])



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
                    </Col>
                    <Col span={24} lg={16}>
                        <Table columns={columns} dataSource={data} />
                    </Col>

                </Row>
                <p style={{ textAlign: "center", marginTop: "1rem" }}><Button type="primary" shape="round" size="large">
                    <Link to="/scan">Give Attendence</Link>


                </Button></p>

            </div>
        </Content>
    )
}

export default StudentDashboard
