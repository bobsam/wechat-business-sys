import React, { Component } from 'react';
import {Menu} from 'antd';
import {
    SyncOutlined,
    LinkOutlined
  } from '@ant-design/icons';
import { SelectParam } from 'antd/lib/menu';

interface IProps {
    onSelect?: (key: string) => void;
}

class SiderBar extends Component<IProps, any> {
    onMenuClick (conf: SelectParam) {
        this.props.onSelect && this.props.onSelect(conf.key);
    }

    render () {
        return (
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                onSelect={this.onMenuClick.bind(this)}
            >
                <Menu.Item key="1">
                    <LinkOutlined />
                    <span>商品生成短链接</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <SyncOutlined />
                    <span>原始链接生成链接</span>
                </Menu.Item>
            </Menu>
        )
    }
}

export default SiderBar;
