import React from 'react'
import Image from "next/image";
import * as XLSX from "xlsx"
const File = ({file}) => {
const {name, downloadReqs} = file;
  return (
    <div className='w-full bg-black rounded-md flex justify-between items-center px-2 mb-2 p-1 drop-shadow-lg'>
        <p className='text-white'>{name}</p>
        <button onClick={() => {XLSX.writeFile(downloadReqs.new_wb, downloadReqs.fileNameWithoutExt + ".csv")}}>
            <Image src={`./assets/upload.svg`} width={20} height={20} alt='download file' />
        </button>
    </div>
  )
}

export default File