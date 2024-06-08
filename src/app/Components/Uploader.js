"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Uploader = () => {

	// checker

	useEffect(() => {
		const uploadZone = document.getElementById("upload-zone")
		const events = ['dragenter', 'dragover', 'dragleave', 'drop']
		events.forEach(event=> {
			uploadZone.addEventListener(event, handler);
		})
		function handler (e) {
			e.stopPropagation();
			e.preventDefault();
			let kinds = {folders: 0, files: 0}
			if (e.dataTransfer.items)
			{
				console.log(e.dataTransfer.items);
				const item = e.dataTransfer.items[0];
				console.log(item);
	
				for (let x = 0; x < e.dataTransfer.items.length; x++) {
					if (!e.dataTransfer.items[x].type)
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
		return () => {
			events.forEach(event=> {
			uploadZone.removeEventListener(event, handler)});
		}
	}, [])

	

    return (
        <div id="upload-zone" className=" w-56 flex flex-col items-center justify-center mx-auto mt-16 bg-black rounded-md py-4 px-2 drop-shadow-2xl">
            <p className="font-semibold mb-4 text-white">Drop Your Folder Here</p>
            <Image src={`./assets/upload.svg`} width={32} height={32} className="cursor-pointer" alt="upload"  />
        </div>
    );
};

export default Uploader;
