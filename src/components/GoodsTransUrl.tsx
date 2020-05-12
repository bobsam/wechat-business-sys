import React, { Component } from "react";
import { Input, Select, message, Spin, Button, Modal, Tooltip } from "antd";
import {
    getGoodsDetail,
    getAccountMsg,
    getCoolbuyWebUrl,
    // generateShortenUrl,
    generateShortenUrlV2
} from "../api/getDetail";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";

import "../assets/css/goodsTransUrl.less";

const { Search } = Input;
const { Option } = Select;

interface IState {
    searchLoading: boolean;
    accountMsg: any;
    goodsDetail: any;
    currentUser: string;
    urlType: string;
    coolbuyWebUrl: string;
    coolbuyMpUrl: string;
    shortenUrlMsg: {
        longurl: string;
        shorturl?: string;
    };
    modalVisible: boolean;
    submitLoading: boolean;
}

export default class GoodsTransUrl extends Component<any, IState> {
    state = {
        searchLoading: false,
        accountMsg: {} as any,
        goodsDetail: {} as any,
        currentUser: "",
        urlType: "web",
        coolbuyWebUrl: "",
        coolbuyMpUrl: "",
        shortenUrlMsg: {
            longurl: "",
            shorturl: ""
        },
        modalVisible: false,
        submitLoading: false
    };

    async componentDidMount() {
        const resp = await getAccountMsg();

        if (resp.code === 200) {
            this.setState({
                accountMsg: resp.result || {},
                currentUser: Object.keys(resp.result)[0]
            });
        }
    }

    async onGoodsSearch(id: string) {
        if (!id) {
            message.error("请输入商品ID！");

            return;
        }

        if (id && !Number(id)) {
            message.error("请输入正确的商品ID！");

            return;
        }

        this.setState({
            searchLoading: true
        });

        try {
            const resp = await getGoodsDetail(id);

            if (resp.code === 200) {
                this.setState({
                    goodsDetail: resp.result || {}
                });
            } else {
                message.error("出错啦~");

                this.setState({
                    goodsDetail: {}
                });
            }

            this.setState({
                searchLoading: false
            });
        } catch (error) {
            message.error("出错啦~");

            console.error(error);

            this.setState({
                searchLoading: false,
                goodsDetail: {}
            });
        }
    }

    handleUserListSelect(value: string) {
        this.setState({
            currentUser: value
        });
    }

    handleUrlTypeSelect(value: string) {
        this.setState({
            urlType: value
        });
    }

    async onSubmit() {
        const { currentUser, goodsDetail, urlType } = this.state;

        if (!(goodsDetail && goodsDetail.id)) {
            message.error("请输入商品id，或请搜索商品后确认！");

            return;
        }

        if (!currentUser) {
            message.error("请选择用户~");

            return;
        }

        this.setState({
            submitLoading: true,
            coolbuyWebUrl: '',
            coolbuyMpUrl: '',
            shortenUrlMsg: {
                longurl: '',
                shorturl: ''
            }
        });

        try {
            if (urlType === "web") {
                const resp = await getCoolbuyWebUrl(
                    urlType,
                    currentUser,
                    goodsDetail.id
                );

                if (resp.code === 200 && resp.result) {
                    // const shortenResp = await generateShortenUrl(resp.result);
                    const shortenResp = await generateShortenUrlV2(resp.result);

                    if (shortenResp.code === 200) {
                        this.setState({
                            coolbuyWebUrl: resp.result,
                            shortenUrlMsg: {
                                longurl: shortenResp.result.longurl || shortenResp.result.long_url,
                                shorturl: shortenResp.result.shorturl || shortenResp.result.short_url
                            }
                        });

                        this.setModal2Visible(true);
                    }
                } else {
                    message.error('生成失败，请稍候再试');
                }
            } else if (urlType === "mp") {
                const resp = await getCoolbuyWebUrl(
                    urlType,
                    currentUser,
                    goodsDetail.id
                );

                if (resp.code === 200 && resp.result) {
                    this.setState({
                        coolbuyMpUrl: resp.result,
                        shortenUrlMsg: {
                            longurl: resp.result,
                            shorturl: ""
                        }
                    });

                    this.setModal2Visible(true);
                } else {
                    message.error('生成失败，请稍候再试');
                }
            }

            this.setState({
                submitLoading: false
            });
        } catch (error) {
            this.setState({
                submitLoading: false
            });

            console.error(error);

            message.error('生成失败，请稍候再试');
        }
    }

    setModal2Visible(modal2Visible: boolean) {
        this.setState({
            modalVisible: modal2Visible
        });
    }

    renderUserList() {
        const { accountMsg } = this.state;
        const defaultValue = Object.keys(accountMsg)[0];

        return defaultValue ? (
            <Select
                defaultValue={defaultValue}
                style={{ width: 400 }}
                onChange={this.handleUserListSelect.bind(this)}
            >
                {Object.keys(accountMsg).map((item: string, index) => {
                    return (
                        <Option key={index} value={item}>
                            名称：{accountMsg[item]["chn_name"]} || 媒介：
                            {accountMsg[item]["medium_name"]}
                        </Option>
                    );
                })}
            </Select>
        ) : (
            <Spin />
        );
    }

    render() {
        const {
            searchLoading,
            goodsDetail,
            modalVisible,
            shortenUrlMsg,
            submitLoading,
            coolbuyWebUrl,
            coolbuyMpUrl
        } = this.state;
        const goodsDetailUrl = goodsDetail.id
            ? `https://coolbuy.com/product/detail/${goodsDetail.id}/`
            : "";

        const originTransUrl = shortenUrlMsg.longurl || coolbuyMpUrl || coolbuyWebUrl || '';

        return (
            <div className="m-goodsTransUrl">
                <div className="u-search-section">
                    <Tooltip
                        title="输入商品ID后，记得点击一下搜索哦"
                        placement="right"
                    >
                        <Search
                            placeholder="请输入商品ID"
                            onSearch={this.onGoodsSearch.bind(this)}
                            style={{ width: 200 }}
                            enterButton
                            loading={searchLoading}
                        />
                    </Tooltip>
                </div>
                {goodsDetail.id ? (
                    <div className="u-goods-msg">
                        <span>
                            商品名称：<strong>{goodsDetail.title}</strong>
                        </span>
                        <span style={{ marginLeft: 10 }}>
                            <a
                                href={goodsDetailUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                去详情页查看>>
                            </a>
                        </span>
                    </div>
                ) : null}
                <div className="u-user-section">{this.renderUserList()}</div>
                <div className="u-user-section">
                    <Select
                        defaultValue={"web"}
                        onChange={this.handleUrlTypeSelect.bind(this)}
                    >
                        <Option value="web">Web端</Option>
                        <Option value="mp">小程序端</Option>
                    </Select>
                </div>
                <div className="u-operation">
                    <Button type="primary" loading={submitLoading} onClick={this.onSubmit.bind(this)}>
                        生成短链接
                    </Button>
                </div>

                <Modal
                    title="链接生成结果"
                    centered
                    visible={modalVisible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                >
                    <p>
                        原始链接：
                        <a
                            href={originTransUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {originTransUrl}
                        </a>
                        <span style={{ marginLeft: 10 }}>
                            <CopyToClipboard
                                text={originTransUrl}
                                onCopy={() => {
                                    message.success("已复制~");
                                }}
                            >
                                <Tooltip title="复制" placement="right">
                                    <Button type="primary" shape="circle">
                                        <CopyOutlined />
                                    </Button>
                                </Tooltip>
                            </CopyToClipboard>
                        </span>
                    </p>
                    {shortenUrlMsg.shorturl ? (
                        <p>
                            短链接：
                            <a
                                href={shortenUrlMsg.shorturl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {shortenUrlMsg.shorturl}
                            </a>
                            <span style={{ marginLeft: 10 }}>
                                <CopyToClipboard
                                    text={shortenUrlMsg.shorturl}
                                    onCopy={() => {
                                        message.success("已复制~");
                                    }}
                                >
                                    <Tooltip title="复制" placement="right">
                                        <Button type="primary" shape="circle">
                                            <CopyOutlined />
                                        </Button>
                                    </Tooltip>
                                </CopyToClipboard>
                            </span>
                        </p>
                    ) : null}
                </Modal>
            </div>
        );
    }
}
