
import './App.css';
import React, {useState} from "react";
import './App.css'
import 'antd/dist/antd.css'
import './index.css'
import {PageHeader, Upload} from "antd";
import AnalyzerForm from "./component/AnalyzerForm";
import { storage } from "./firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import axios from "axios";



function App() {
    const [progress, setProgress ] = useState(0);
    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        console.log(file);
        uploadFiles(file);
        // axios.post(
        //     '', {}
        //         .then(res => {
        //             console.log(res)
        //         })
        // )
    };

    const uploadFiles = (file) => {
        if (!file) return;
        const storageRef = ref(storage, '/${file.id}');
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
    <div className="App">
      <div>
          <div className="App-header">
              <PageHeader>
                  <div className="Header-Name">
                      Content Analyzer
                  </div>
              </PageHeader>
          </div>
          <AnalyzerForm/>

          <div className="upload">
              <form onSubmit={formHandler}>
                  <input type="file" className="input"/>
                  <button type="submit">Upload Video</button>
              </form>
              <div>Upload {progress} %</div>

          </div>
      </div>

    </div>
  );

}

export default App;
