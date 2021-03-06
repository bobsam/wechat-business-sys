import React, { Component } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

class PageFooter extends Component {
    render () {
        return (
            <Footer style={{textAlign: 'center', lineHeight: '40px'}}>
                <p>© Create By Bob - {new Date().getFullYear()}</p>
                <p>
                    <a href="http://www.beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">ICP备案 粤ICP备20007269号</a>
                </p>
            </Footer>
        )
    }
}

export default PageFooter;
