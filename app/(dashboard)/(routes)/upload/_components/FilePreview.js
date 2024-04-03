import { X } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

function FilePreview(props) {
  const fileType = props.file.type ? props.file.type.split('/')[1] : null; // Extract file format

  return (
    <div className='flex items-center gap-2 justify-between mt-5 border rounded-md p-2 border-blue-200'>
      <div className='flex items-center '> 
      <Image src='/file.png' width={50} height={50} alt="Nothing"/>
      <div className='text-left'>
        <h2>{props.file.name}</h2>
        <h2 className='text-[12px] text-gray-400'>{fileType} / { (props.file.size/1024/1024).toFixed(2)}MB</h2> 
      </div>
      </div>
      <X className='text-red-500 cursor-pointer' onClick={props.removeFile}/>
    </div>
  )
}

export default FilePreview
