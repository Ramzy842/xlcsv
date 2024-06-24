"use client";
import { useEffect, useState } from "react";
import Files from "./Components/Files";
import Header from "./Components/Header";
import Uploader from "./Components/Uploader";
import Error from "./Components/Error";
import Timer from "./Components/Timer";
import { TimerProvider } from "./Context";

export default function Home() {
    const [files, setFiles] = useState([]);
    const [err, setErr] = useState("");
    const [folderName, setFolderName] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);
    return (
        <>
            <TimerProvider>
                <Header files={files} err={err} />
                {err && <Error err={err} />}
                <Uploader
                    files={files}
                    setFiles={setFiles}
                    setErr={setErr}
                    err={err}
                    folderName={folderName}
                    setFolderName={setFolderName}
                    uploadedFiles={uploadedFiles}
                    setUploadedFiles={setUploadedFiles}
                />
                <Timer
                    files={files}
                    uploadedFiles={uploadedFiles}
                    setUploadedFiles={setUploadedFiles}
                />
            </TimerProvider>
            <Files
                files={files}
                folderName={folderName}
                uploadedFiles={uploadedFiles}
            />
        </>
    );
}
