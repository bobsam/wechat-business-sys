import React, { Component } from 'react';
import { Layout } from 'antd';
import {RouteComponentProps} from 'react-router-dom';
import PageFooter from '../../components/PageFooter';

import './homeForCheck.less';

const { Header, Content } = Layout;

class Home extends Component<RouteComponentProps> {
    componentDidMount () {

    }

    render() {
        return (
            <div className="p-home">
                <Layout>
                    <Header style={{color: '#fff'}}>伍尔灵芝IT经验</Header>
                </Layout>
                <Layout>
                    <Layout>
                        <Content style={{minHeight: '400px', textAlign: 'center', marginTop: '200px'}}>
                            <p>闲情逸致。有空记事。</p>
                        </Content>
                    </Layout>
                </Layout>
                <Layout>
                    <PageFooter />
                </Layout>
            </div>
        );
    }
}

export default Home;
