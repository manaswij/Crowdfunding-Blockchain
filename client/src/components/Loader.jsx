import React from 'react'

export default function Loader() {
  return (
    <div className='fixed z-20 top-0 left-0 w-full h-full flex items-center justify-center bg-[#F86754]/5 backdrop-blur'>
        <div className='loader'></div>
        <img 
            src="/brand/p3.png"  
            alt="loader" 
            width={"24px"}
            className='absolute animate-pulse'
        />
    </div>
  )
}
