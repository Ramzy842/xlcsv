
"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as XLSX from "xlsx"

const Uploader = ({data, setData}) => {
	const [fileName, setFileName] = useState("")
	const [fileSize, setFileSize] = useState("")
	const [filePresent, setFilePresent] = useState(false)
	// checker
	const processFile = (file) => {
		const fr = new FileReader();
  
		fr.readAsDataURL(file);
		fr.addEventListener('loadstart', changeStatus('Start Loading'));
		fr.addEventListener('load', changeStatus('Loaded'));
		fr.addEventListener('loadend', loaded);
		fr.addEventListener('progress', setProgress);
		fr.addEventListener('error', errorHandler);
		fr.addEventListener('abort', changeStatus('Interrupted'));
	}
	const delay = ms => new Promise(res => setTimeout(res, ms));
	async function handler (e) {
		
		
		const input = document.querySelector("input")
		e.stopPropagation();
		e.preventDefault();
		let kinds = {folders: 0, files: 0}
		if (input.files[0].type === "application/vnd.ms-excel")
		{
			const reader = new FileReader()
			for (let x = 0; x < input.files.length; x++) {
				reader.readAsBinaryString(input.files[x])
				reader.onload = async (e) => {
					const data = e.target.result
					const wb = XLSX.read(data, {type: "binary"})
					const sheetName = wb.SheetNames[0];
					const sheet = wb.Sheets[sheetName]
					const parsedData = XLSX.utils.sheet_to_json(sheet)
					if(parsedData.length)
					{
						setFilePresent(true)
						await delay(1000)
						setData(parsedData)
					}
				}
				if (!input.files[x].type)
					kinds = {...kinds, folders: kinds.folders + 1};
				else
					kinds = {...kinds, files: kinds.files + 1}
			}
			if (kinds.folders == 1)
				console.log("You dropped 1 folder.");
			else if (kinds.files == 1)
				console.log("You dropped 1 file.");
			else if (kinds.folders > 1)
				console.log(`You dropped ${kinds.folders} folders!`);
			else if (kinds.files > 1)
				console.log(`You dropped ${kinds.files} files!`);
		}
	}

	function handleInput(e) {
		setFileName(e.target.files[0].name)
		setFileSize(convertBytes(e.target.files[0].size))
	}

	function convertBytes(value) {
		const units = {
		  KB: 1024,
		  MB: 1024 * 1024,
		  GB: 1024 * 1024 * 1024,
		};
	  
		if (value === 0) return "0 Bytes";
		const bytes = value;
		const i = Math.floor(Math.log(bytes) / Math.log(units.KB));
		const formattedValue = (bytes / Math.pow(units.KB, i)).toFixed(1);
	  
		const unit = i >= units.GB / units.KB
		  ? "GB"
		  : ["Bytes", "KB", "MB", "GB"][i];
		return formattedValue + " " + unit;
	}
	
    return (
        <div id="upload-zone" className={`w-56 flex flex-col items-center justify-center mx-auto mt-16 bg-black rounded-md p-4 drop-shadow-2xl ${fileName && " w-auto border-b-2 border-yellow-400 max-w-xl"} ${filePresent && "border-green-500"}`}>
            {!fileName && <><p className="font-semibold mb-4 text-white">Drop Your Folder Here</p>
			<Image src={`./assets/upload.svg`} width={32} height={32} className="cursor-pointer" alt="upload"  /></>}
			{fileName && <div className="flex text-white justify-between w-full  ">
				<div className="w-3/5 max-w-md">
					<p className="font-bold truncate">File Name: <span className="font-normal ">{fileName}</span></p>
					<p className="font-bold truncate">Size: <span className="font-normal">{fileSize}</span></p>
				</div>
				 <div className="flex items-center justify-center cursor-pointer" onClick={handler}>
					{!filePresent && <p className="mr-2">Start conversion</p>}
					{filePresent ? <Image src={`./assets/check.svg`} width={20} height={20} className="cursor-pointer" alt="start-conversion"  /> : <Image src={`./assets/arrow-r.svg`} width={20} height={20} className="cursor-pointer" alt="start-conversion"  />} 
				</div>
			</div>}
			{<input accept=".xls, .xlsx" className={`${fileName && "hidden"} text-white`} type="file" onChange={handleInput} />}
			{/* </input> */}
            
        </div>
    );
};

export default Uploader;
