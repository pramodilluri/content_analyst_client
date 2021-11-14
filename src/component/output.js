import {Button} from 'antd';
import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import "../App.css";
import axios from "axios";


class OutputBox extends React.Component {
    state = {
        value: '',
        copied: false,
        persons:[]
    };

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                const persons = res.data;
                this.setState({persons});
                console.log(res)
            })
    }


    render() {
        return (
            <>
                <div >
                    <ul>
                        { this.state.persons.map(person => <li>{person.name}</li>)}
                    </ul>
                    <CopyToClipboard className="Copy" text={this.state.value}
                                     onCopy={() => this.setState({copied: true})}>
                        <Button className="CopyButton">Copy</Button>
                    </CopyToClipboard>
                    {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}

                </div>

            </>
        );
    }
}
export default OutputBox;