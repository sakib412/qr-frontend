import React from 'react'
import { Layout } from 'antd';
import cover from './cover.jpg'

const { Content } = Layout;

function Home() {
    return (
        <Content style={{ padding: '0 10px' }}>


            <div className="site-layout-content"> <img src={cover} alt="Cover" width="100%" /></div>
        </Content>
    )
}

export default Home
