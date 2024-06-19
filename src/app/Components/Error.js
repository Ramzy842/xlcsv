import React from 'react'

const Error = ({files}) => {


  return (
    <div className='absolute right-4 top-20 bg-black px-4 py-2 border-b-2 border-red-500 rounded-b-md drop-shadow-3xl'>Files extension must be XLS or XLSX</div>
  )
}

export default Error