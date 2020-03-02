import React, { Component } from 'react';
import { Input } from 'antd';

import '../assets/css/goodsTransUrl.less';

const { Search } = Input;

export default class GoodsTransUrl extends Component {
    render () {
        return (
            <div className="m-goodsTransUrl">
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                    enterButton
                />
            </div>
        )
    }
}
