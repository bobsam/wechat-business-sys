import React, { Component } from 'react';
import { Layout } from 'antd';

import SiderBar from '../../components/SiderBar';
import DefaultContent from '../../components/DefaultContent';
import GoodsTransUrl from '../../components/GoodsTransUrl';
import OriginUrlTransUrl from '../../components/OriginUrlTransUrl';
import {getGoodsDetail} from '../../api/getDetail';

import './index.less';

const { Header, Footer, Sider, Content } = Layout;

interface IState {
    currentSidebarKey: string;
}

class Home extends Component<any, IState> {
    constructor (props: any) {
        super(props);

        this.state = {
            currentSidebarKey: '1'
        };
    }

    getCurrentContentComp (key: string) {
        switch (key) {
            case '1':
                return <GoodsTransUrl/>;
            case '2':
                return <OriginUrlTransUrl />;
            default:
                return <DefaultContent />;
        }
    }

    sidebarSelect (key: string) {
        this.setState({
            currentSidebarKey: key
        });
    }

    async componentDidMount () {
        console.log(await getGoodsDetail('7452'));
    }

    render() {
        return (
            <div className="p-home">
                <Layout>
                    <Header style={{color: '#fff'}}>方方系统</Header>
                </Layout>
                <Layout>
                    <Sider style={{minHeight: '400px'}}>
                        <SiderBar onSelect={this.sidebarSelect.bind(this)}></SiderBar>
                    </Sider>
                    <Layout>
                        <Content style={{minHeight: '400px'}}>
                            {this.getCurrentContentComp(this.state.currentSidebarKey)}
                        </Content>
                    </Layout>
                </Layout>
                <Layout>
                    <Footer style={{textAlign: 'center'}}>© Create By Bob - 2020</Footer>
                </Layout>
            </div>
        );
    }
}

export default Home;
