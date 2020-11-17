import React, { Component } from "react";
import { Input, message, Button, Modal, Select, Tooltip } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import {
    generateShortenUrlV2,
    // generateShortenUrlV3
} from "../api/getDetail";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";

import "../assets/css/originUrlTransUrl.less";

const { Option } = Select;

interface IState {
    inputText: string;
    modalVisible: boolean;
    submitLoading: boolean;
    urlMsg: {
        longurl: string;
        shorturl: string;
    };
    urlType: string;
}

export default class OriginUrlTransUrl extends Component<any, IState> {
    state = {
        inputText: "",
        modalVisible: false,
        submitLoading: false,
        urlMsg: {
            longurl: "",
            shorturl: ""
        },
        urlType: "t.cn"
    };

    handleInputBlur(evt: React.ChangeEvent<HTMLInputElement>) {
        const value = evt.target.value;

        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(() => {
                this.setState({
                    inputText: value
                });
            });
        } else {
            setTimeout(() => {
                this.setState({
                    inputText: value
                });
            }, 66);
        }
    }

    checkUrl(url: string): boolean {
        let success = false;
        const rTestChinese = /[\u4e00-\u9fa5]/g;
        const rHasProtocol = /^(https|http):\/\//gi;

        if (!url) {
            message.error("请输入链接！");

            return success;
        }

        if (url && (rTestChinese.test(url) || !rHasProtocol.test(url))) {
            message.error("请输入正确的链接！");

            return success;
        }

        success = true;

        return success;
    }

    async onSubmit() {
        const { inputText, urlType } = this.state;

        this.setState({
            submitLoading: true
        });

        if (this.checkUrl(inputText)) {
            const resp = await generateShortenUrlV2(inputText);

            if (
                resp.code === 200 &&
                resp.result &&
                (resp.result.status === 200 || resp.result.code === 200)
            ) {
                this.setState({
                    urlMsg: {
                        longurl: resp.result.longurl || resp.result.long_url || '',
                        shorturl: resp.result.shorturl || resp.result.short_url || ''
                    }
                });

                this.setModal2Visible(true);
            } else {
                message.error('链接生成失败，请稍候再试');
            }

            this.setState({
                submitLoading: false
            });
        } else {
            this.setState({
                submitLoading: false
            });
        }
    }

    setModal2Visible(modal2Visible: boolean) {
        this.setState({
            modalVisible: modal2Visible
        });
    }

    render() {
        const { submitLoading, modalVisible, urlMsg } = this.state;

        return (
            <div className="m-transShortenUrl">
                <div className="u-input-section">
                    <Input
                        size="large"
                        placeholder="请输入原始链接"
                        prefix={<LinkOutlined />}
                        onChange={this.handleInputBlur.bind(this)}
                    />
                    <Select
                        defaultValue="t.cn"
                        style={{ marginTop: "20px" }}
                        onSelect={(value: string) =>
                            this.setState({ urlType: value })
                        }
                    >
                        <Option value="t.cn">Weibo</Option>
                        <Option value="url.cn">Tencent</Option>
                    </Select>
                    <div style={{ marginTop: "20px" }}>
                        <Button
                            type="primary"
                            loading={submitLoading}
                            onClick={this.onSubmit.bind(this)}
                        >
                            转换
                        </Button>
                    </div>
                </div>

                <Modal
                    title="链接转换结果"
                    centered
                    visible={modalVisible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                >
                    <p>
                        原始链接：
                        <a
                            href={urlMsg.longurl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {urlMsg.longurl}
                        </a>
                        <span style={{ marginLeft: 10 }}>
                            <CopyToClipboard
                                text={urlMsg.longurl}
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
                    <p>
                        短链接：
                        <a
                            href={urlMsg.shorturl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {urlMsg.shorturl}
                        </a>
                        <span style={{ marginLeft: 10 }}>
                            <CopyToClipboard
                                text={urlMsg.shorturl}
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
                </Modal>
            </div>
        );
    }
}
