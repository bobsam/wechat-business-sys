import React, { Component } from 'react';
import { Layout } from 'antd';
import {RouteComponentProps} from 'react-router-dom';

import SiderBar from '../../components/SiderBar';
import DefaultContent from '../../components/DefaultContent';
import GoodsTransUrl from '../../components/GoodsTransUrl';
import OriginUrlTransUrl from '../../components/OriginUrlTransUrl';
import PageFooter from '../../components/PageFooter';

import qs from 'query-string';

import './index.less';

const { Header, Sider, Content } = Layout;

interface IState {
    currentSidebarKey: string;
}

class Home extends Component<RouteComponentProps, IState> {
    state = {
        currentSidebarKey: '1'
    };

    componentDidMount () {
        const {search} = this.props.location;
        const sSearch = search ? search.split('?')[1] : '';
        let oSearch: any = {};

        if (sSearch) {
            oSearch = qs.parse(sSearch);
        }

        if (oSearch.type) {
            // this.setState({
            //     currentSidebarKey: oSearch.type
            // });
        }
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

    render() {
        return (
            <div className="p-home">
                <Layout>
                    <Header style={{color: '#fff'}}>分享轶事</Header>
                </Layout>
                <Layout>
                    <Sider style={{minHeight: '600px'}}>
                        <SiderBar onSelect={this.sidebarSelect.bind(this)}></SiderBar>
                    </Sider>
                    <Layout>
                        <Content style={{minHeight: '600px'}}>
                            {this.getCurrentContentComp(this.state.currentSidebarKey)}
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
