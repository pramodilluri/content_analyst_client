import { storage } from "../firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import axios from "axios";
import React, {useState} from "react";

class UploadAudio extends React.Component {
    state = {

    }

    render() {
        const [progress, setProgress ] = useState(0);
        const formHandler = (e) => {
            e.preventDefault();
            const file = e.target[0].files[0];
            console.log(file);
            uploadFiles(file);
            axios.post(
                '', {}
                    .then(res => {
                        console.log(res)
                    })
            )
        };

        const uploadFiles = (file) => {
            if (!file) return;
            const storageRef = ref(storage, '/files/${file.name}');
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(prog);
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
                }

            );

        };

        return (
            <div className="upload">
                <form onSubmit={formHandler}>
                    <input type="file" className="input"/>
                    <button type="submit">Upload Video</button>
                </form>
                <div>Upload {progress} %</div>
            </div>
        )
    }


}
export default UploadAudio