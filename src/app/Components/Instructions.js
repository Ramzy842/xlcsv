import React, { useState } from 'react'
import Steps from './Steps';

const Instructions = () => {
  return (
    <div className='max-w-5xl mx-auto mt-8 bg-black p-4 rounded-md flex flex-col items-center justify-center transition-all'>
        <h2 className='text-center text-xl mb-4 text-gray-300 border-b border-gray-500 pb-2 w-full select-none'>How to convert XLS/XLSX to CSV</h2>
        <Steps />
    </div>
  )
}

export default Instructions;