import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from "react";


class MyUpload extends React.Component {
    state = {
        fileList: [
            {
                uid: '-1',
                name: 'xxx.mp4',
                status: 'done',
                url: 'http://www.baidu.com/xxx.png',
            },
        ],
    };

    handleChange = info => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        this.setState({ fileList });
    };

    render() {
        const props = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: this.handleChange,
            multiple: false,
        };
        return (
            <Upload {...props} fileList={this.state.fileList}>
                <Button icon={<UploadOutlined />}>Upload Video</Button>
            </Upload>
        );
    }
}

export default MyUpload