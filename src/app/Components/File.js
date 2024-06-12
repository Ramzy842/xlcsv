import React from 'react'
import Image from "next/image";
import * as XLSX from "xlsx"
const File = ({file}) => {
const {name, downloadReqs} = file;
  return (
    <div className='w-full bg-black/40 backdrop-blur-md	 rounded-md flex justify-between items-center px-4 mb-2 py-2 drop-shadow-lg z-40'>
        <p className='text-white z-40'>{name}</p>
        <button onClick={() => {XLSX.writeFile(downloadReqs.new_wb, downloadReqs.fileNameWithoutExt + ".csv")}}>
            <Image src={`./assets/upload.svg`} width={20} height={20} alt='download file' />
        </button>
    </div>
  )
}

export default File