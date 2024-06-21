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
    return (
        <>
            <Header />
            <TimerProvider>
                <Uploader files={files} setFiles={setFiles} />
                <Timer files={files} />
            </TimerProvider>

            {files && files.length && <Files files={files} />}
        </>
    );
}
