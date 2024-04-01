import React, { useState } from 'react'
import CampaignDetails from '../components/CampaignDetails'
import { daysLeft } from '../utils'

export default function CampaignCard(props) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const remainingDays = daysLeft(props.deadline)

  return (
    <div className='relative'>
      <div
        onClick={() => setIsDetailsVisible(true)}
        className='CampaignCard'>
        <img 
          src={props.image} 
          alt="heroimage" 
          className='CampaignCard__heroimg
            absolute top-0 left-0 w-full h-full rounded-lg object-cover opacity-50 transition-opacity
          '
        />
        <div className='absolute top-0 right-0 p-2 flex flex-col gap-1'>
          <div className='p-2 flex flex-col justify-center rounded-lg border border-slate-400 bg-slate-700/[25%] backdrop-blur text-center'>
            <span className='text-lg text-slate-200 font-medium'>{remainingDays}</span>
            <span className='text-xs text-slate-300'>Days left</span>
          </div>
          
          <div className='p-2 flex flex-col justify-center rounded-lg border border-slate-400 bg-slate-700/[25%] backdrop-blur text-center'>
            <span className='text-lg text-slate-200 font-medium'>
            {props.amountCollected / props.target * 100}%
            </span>
            <span className='text-xs text-slate-300'>Reached</span>
          </div>
        </div>

        <div className='relative z-10 bottom-0 left-0 w-full p-2 rounded-lg bg-slate-500/[15%] backdrop-blur'>
          <h2 className='mb-1 text-[20px] font-semibold'>{props.title}</h2>
          <p className='CampaignCard__description mb-1 text-sm text-slate-100 line-clamp-3'>{props.description}</p>
          
          <div className='flex items-center gap-2'>
            <img 
              src="/brand/p3.png" 
              alt="logo" 
              width={"18px"}
            />
            <div className='text-xs text-slate-300 truncate'>
              <span>by {props.owner}</span>
            </div>
          </div>
        </div>
      </div>


      {isDetailsVisible ? <CampaignDetails setVisible={setIsDetailsVisible} campaign={props} /> : null}
    </div>
  )
}
