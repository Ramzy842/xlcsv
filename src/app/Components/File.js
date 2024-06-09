import React from 'react'
import Image from "next/image";
const File = ({name, obj, id}) => {
  return (
    obj && <div className='w-full bg-black rounded-md flex justify-between items-center px-2 mb-2 p-1 drop-shadow-lg'>
        {/* <p className='text-white'>{name}</p> */}
		<p className='text-white'>{id}</p>
		<p className='text-white'>{obj["First Name"]}</p>
		<p className='text-white'>{obj["Last Name"]}</p>
		<p className='text-white'>{obj["Age"]}</p>
		<p className='text-white'>{obj["Gender"]}</p>
        <button>
            <Image src={`./assets/upload.svg`} width={20} height={20} alt='download file' />
        </button>
    </div>
  )
}

export default File