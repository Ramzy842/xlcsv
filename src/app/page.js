"use client"
import { useState } from "react";
import Files from "./Components/Files";
import Header from "./Components/Header";
import Uploader from "./Components/Uploader";

export default function Home() {
	const [data, setData] = useState([])
    return (
        <>
            <Header />
            <Uploader setData={setData} />
            <Files data={data} />
        </>
    );
}
