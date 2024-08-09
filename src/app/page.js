"use client";
import { useEffect, useState } from "react";
import Files from "./Components/Files";
import Header from "./Components/Header";
import Uploader from "./Components/Uploader";
import Error from "./Components/Error";
import Timer from "./Components/Timer";
import { TimerProvider } from "./Context";
import Instructions from "./Components/Instructions";

export default function Home() {
    const [files, setFiles] = useState([]);
    const [err, setErr] = useState("");
    const [folderName, setFolderName] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);
    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-800 to-cyan-900">
            <TimerProvider>
                <Header files={files} err={err} />
                {err && <Error err={err} />}
                <div className="mx-auto max-w-3xl text-center text-white leading-snug mt-16 select-none">
                    <h1 className="text-2xl">
                        XLS/XLSX (Excel) to CSV Converter{" "}
                    </h1>
                </div>
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
            {!files.length && <Instructions />}
            <Files
                files={files}
                folderName={folderName}
                uploadedFiles={uploadedFiles}
            />
            <footer className="absolute bottom-0 bg-black w-full flex justify-center items-center p-1">
                <p className="mr-2">Made by Ramzi Chahbani</p>
                <a href="https://github.com/Ramzy842/xlcsv">
                    <img src="./assets/github.svg" className="" />
                </a>
            </footer>
        </div>
    );
}
