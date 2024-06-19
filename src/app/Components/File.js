import React from 'react'
import Image from "next/image";
import * as XLSX from "xlsx"
const File = ({file}) => {
const {name, downloadReqs} = file;
  return (
<<<<<<< HEAD
    <div className='w-full bg-black/40 backdrop-blur-md	 rounded-md flex justify-between items-center px-4 mb-2 py-2 drop-shadow-lg z-40'>
        <p className='text-white z-40'>{name}</p>
=======
    <div className='w-full bg-black/40 backdrop-blur-md	 rounded-sm flex justify-between items-center px-2 mb-2 py-1 drop-shadow-lg z-40'>
        <p className='text-white z-40 text-sm'>{name}</p>
>>>>>>> dnd
        <button onClick={() => {XLSX.writeFile(downloadReqs.new_wb, downloadReqs.fileNameWithoutExt + ".csv")}}>
            <Image src={`./assets/upload.svg`} className='select-none	' width={18} height={18} alt='download file' />
        </button>
    </div>
  )
}

export default File