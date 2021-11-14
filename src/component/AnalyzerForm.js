import React from 'react';
import axios from 'axios';
import TextArea from "antd/es/input/TextArea";
import {Button, Radio} from 'antd';
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {getFiles} from "../services/upload";


class AnalyzerForm extends React.Component {
    state = {
        copied: false,
        text: "",
        value1: "KeySentence",
        result: ""
    }


    handleChange = event => {
        this.setState({ text: event.target.value });
    }


    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.text)

        if (this.state.value1 == "KeySentence") {
            axios.post(`http://54.208.161.236:5000/ext`,{"text":this.state.text})
                .then(res => {
                    const result = res.data.response;
                    this.setState({result})
                    console.log(res);

                })
        } else if (this.state.value1 == "KeyWords") {
            axios.post(
                `http://54.208.161.236:5000/kwords`, {"text":this.state.text})
                .then(res => {
                    const output = res.data.response;
                    console.log(res.data.response)
                    let result = output.map(a => a.parsed_value)
                    console.log(result)
                    this.setState({result})


                })

        } else if (this.state.value1 == "Summary") {
            axios.post(`http://54.208.161.236:5000/abs`,{"text":this.state.text})
                .then(res => {
                    const result = res.data.response;
                    this.setState({result})
                    console.log(res);
                })
        }
    }

    onChange1 = e => {
        console.log('radio1 checked', e.target.value);
        this.setState({
            value1: "KeySentence",
        });
    };

    onChange2 = e => {
        console.log('radio2 checked', e.target.value);
        this.setState({
            value1: "KeyWords",
        });
    };

    onChange3 = e => {
        console.log('radio3 checked', e.target.value);
        this.setState({
            value1: "Summary",
        });
    };


//输入需要分析的文本，用文本去请求接口，拿到返回的值
    render() {
        return (
            <div className='Main'>
                <div className='Inbox'>
                    <form onSubmit={this.handleSubmit}>
                        <Radio.Group defaultValue="KeySentence" buttonStyle="solid" className="RadioGroup">
                            <Radio.Button value="KeySentence"  onChange={this.onChange1}>KeySentence</Radio.Button>
                            <Radio.Button value="KeyWords"  onChange={this.onChange2}>KeyWords</Radio.Button>
                            <Radio.Button value="Summary"  onChange={this.onChange3}>Summary</Radio.Button>
                        </Radio.Group>
                        <label className='InputBox'>
                            <TextArea
                                placeholder="Please input your text here"
                                autoSize={{ minRows: 20, maxRows: 40}}
                                name={"name"}
                                onChange={this.handleChange}
                                showCount maxLength={2500}
                                allowClear
                            />
                        </label>
                        <div className='Analyze-Button'>
                            <button  className="Submit" type="submit">Analyze</button>
                        </div>

                    </form>
                </div>

                <div className='Outbox'>
                    <TextArea
                        className="Output"
                        autoSize={{ minRows: 20, maxRows: 40}}
                        value={ this.state.result }
                    >
                    </TextArea>

                    <CopyToClipboard className="Copy" text={this.state.result}
                                     onCopy={() => this.setState({copied: true})}>
                        <Button className="CopyButton">Copy</Button>
                    </CopyToClipboard>
                    {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                </div>
            </div>
        )
    }
}

export default AnalyzerForm