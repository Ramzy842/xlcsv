"use client"
import { useState } from "react";
import Files from "./Components/Files";
import Header from "./Components/Header";
import Uploader from "./Components/Uploader";

export default function Home() {
	const [files, setFiles] = useState([])
    return (
        <>
            <Header />
            <Uploader files={files} setFiles={setFiles} />
            <Files files={files} />
        </>
    );
}
