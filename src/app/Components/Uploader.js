
"use client"
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx"

const Uploader = ({setData}) => {

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

	function handler (e) {
		e.stopPropagation();
		e.preventDefault();
		let kinds = {folders: 0, files: 0}
			
			if (e.target.files[0].type === "application/vnd.ms-excel")
			{
				const reader = new FileReader()
				for (let x = 0; x < e.target.files.length; x++) {
					// console.log(e.target.files[x]);
					reader.readAsBinaryString(e.target.files[x])
					reader.onload = (e) => {
						const data = e.target.result
						const wb = XLSX.read(data, {type: "binary"})
						const sheetName = wb.SheetNames[0];
						const sheet = wb.Sheets[sheetName]
						const parsedData = XLSX.utils.sheet_to_json(sheet)
						setData(parsedData)
					}
					if (!e.target.files[x].type)
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

	// useEffect(() => {
	// 	const uploadZone = document.getElementById("upload-zone")
	// 	const events = ['dragenter', 'dragover', 'dragleave', 'drop']
	// 	events.forEach(event=> {
	// 		uploadZone.addEventListener(event, handler);
	// 	})
		
	// 	return () => {
	// 		events.forEach(event=> {
	// 		uploadZone.removeEventListener(event, handler)});
	// 	}
	// }, [])

	

    return (
        <div id="upload-zone" className=" max-w-6xl flex flex-col items-center justify-center mx-auto mt-16 bg-black rounded-md py-4 px-2 drop-shadow-2xl">
            {/* <p className="font-semibold mb-4 text-white">Drop Your Folder Here</p> */}
			<input accept=".xls, .xlsx" className="text-white" type="file" onChange={handler} />
			{/* <Image src={`./assets/upload.svg`} width={32} height={32} className="cursor-pointer" alt="upload"  /> */}
			{/* </input> */}
            
        </div>
    );
};

export default Uploader;
