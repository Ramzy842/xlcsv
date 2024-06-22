"use client";
import { useState } from "react";
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
    return (
        <>
            <Header />
            {err && <Error err={err} />}
            <TimerProvider>
                <Uploader
                    files={files}
                    setFiles={setFiles}
                    setErr={setErr}
                    err={err}
                    folderName={folderName}
                    setFolderName={setFolderName}
                />
                <Timer files={files} />
            </TimerProvider>

            <Files files={files} folderName={folderName} />
        </>
    );
}
