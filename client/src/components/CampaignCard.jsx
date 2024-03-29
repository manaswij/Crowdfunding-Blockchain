import React from 'react'
import { daysLeft } from '../utils'

export default function CampaignCard(props) {
  const remainingDays = daysLeft(props.deadline)

  return (
    <div
      onClick={props.handleClick}
      className='
        relative w-full max-w-72 h-[500px] flex items-end rounded-lg bg-stone-800 cursor-pointer
        md:max-w-none md:w-5/12 md:basis-5/12 md:shrink md:grow
        xl:w-1/4 xl:basis-1/4
      '>
      <img 
        src={props.image} 
        alt="heroimage" 
        className='
          absolute top-0 left-0 w-full h-full rounded-lg object-cover opacity-50 transition-opacity hover:opacity-75
        '
      />
      <div className='absolute top-0 right-0 p-2 flex flex-col gap-1'>
        <div className='p-2 flex flex-col justify-center rounded-lg border border-stone-400 bg-stone-700/[25%] backdrop-blur text-center'>
          <span className='text-lg text-stone-200 font-medium'>{remainingDays}</span>
          <span className='text-xs text-stone-300'>Days left</span>
        </div>
        
        <div className='p-2 flex flex-col justify-center rounded-lg border border-stone-400 bg-stone-700/[25%] backdrop-blur text-center'>
          <span className='text-lg text-stone-200 font-medium'>
          {props.amountCollected / props.target * 100}%
          </span>
          <span className='text-xs text-stone-300'>Reached</span>
        </div>
      </div>

      <div className='relative z-10 bottom-0 left-0 w-full p-2 rounded-lg bg-stone-500/[15%] backdrop-blur'>
        <h2 className='mb-1 line-clamp-2 text-[20px] font-semibold'>{props.title}</h2>
        <p className='mb-1 text-sm text-stone-100 line-clamp-3'>{props.description}</p>
        
        <div className='flex items-center gap-2'>
          <img 
            src="/brand/p3.png" 
            alt="logo" 
            width={"18px"}
          />
          <div className='text-xs text-stone-300 truncate'>
            <span>by {props.owner}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
