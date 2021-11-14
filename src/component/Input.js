import { Input } from 'antd';
import React from "react";
import "../App.css";


const { TextArea } = Input;

class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    state = {
        value: '',
    };

    onChange = ({ target: { value } }) => {
        this.setState({ value });
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }


    render() {
        const { value } = this.state;

        return (
            <>
                <TextArea className="textarea"
                    placeholder="Please input your text here"
                    autoSize={{ minRows: 20, maxRows: 40}}
                    value={value}
                    onChange={this.onChange}
                    showCount maxLength={2500}
                    allowClear
                />
            </>
        );
    }
}
export default InputBox;