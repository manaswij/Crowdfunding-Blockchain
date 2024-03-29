import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context';
import { calculateBarPercentage, daysLeft } from '../utils';
import Loader from './Loader';

export default function CampaignDetails(props) {
  const { getDonations, contract, address, donate } = useStateContext()

  const [isLoading, setIsLoading] = useState(false)
  const [donators, setDonators] = useState([])
  const [amount, setAmount] = useState("")

  const remainingDays = daysLeft(props.campaign.deadline)

  const handleDonate = async() => {
    setIsLoading(true)

    await donate(props.campaign.pId, amount)

    setIsLoading(false)
  }

  const fetchDonators = async() => {
    const data = await getDonations(props.campaign.pId)
    setDonators(data)
  }

  useEffect(() => {
    if(contract) fetchDonators()
  }, [contract, address])


  return (
    <div 
      /* onClick={() => {props.setVisible(false)}} */
      className='fixed top-0 left-0 z-30 w-full h-full p-4 flex items-center justify-center backdrop-blur'>
      {isLoading && <Loader />}

      <div className='relative w-full max-w-3xl max-h-full m-auto flex rounded-lg bg-stone-800 overflow-clip'>
        <div className='
          relative z-10 w-full h-full max-h-[300px] px-4 py-12 overflow-y-auto 
          md:static md:w-2/3 md:p-6'>
          <div className='mb-12 p-2 flex flex-col gap-2 rounded-lg bg-stone-800/35 backdrop-blur md:mb-4 md:p-4 md:flex-row md:border md:border-[#FB998C]'>
            <div>
              <h3 className='text-[20px] font-semibold'>Donate</h3>
              <p className='text-sm text-stone-100 text-pretty'>Support this creator for no reward just because you believe in the project</p>
            </div>

            <div className='shrink-0 w-full flex flex-col md:w-max'>
              <input 
                type="number" 
                placeholder='ETH 0.1'
                step={"0.01"}
                value={amount}
                onChange={(e) => {setAmount(e.target.value)}}
                className='mb-2 w-full h-10 bg-stone-900 rounded-full border border-stone-300 text-center outline-0 focus:border-[#FB998C] placeholder:text-stone-600'
              />
              <button type='button' onClick={handleDonate} className='btn-primary' >Fund Campaign</button>
            </div>
          </div>

          <div className='mb-12 p-2 rounded-lg bg-stone-800/35 backdrop-blur md:mb-4 md:p-0'>
            <h2 className='mb-4 text-[24px] font-semibold'>{props.campaign.title}</h2>
            
            <div className='mb-2 flex items-center gap-2'>
              <img src="/brand/p3.png" alt="logo" width={"18px"} />
              <p className='text-sm text-stone-300 break-all'>
                <span className='block font-medium'>Campaign created by </span>
                {props.campaign.owner}
              </p>
            </div>

            <p className='mb-4 text-stone-200'>{props.campaign.description}</p>
          </div>

          <div className='mb-12 p-2 w-full flex gap-2 rounded-lg bg-stone-800/35 backdrop-blur md:mb-4 md:p-0 md:gap-4'>
            <div className='p-2 flex flex-col items-center rounded-lg border border-stone-400 bg-stone-800/50 text-center'>
              <span className='text-[18px] font-bold text-stone-200'>{remainingDays}</span>
              <span className='text-sm text-stone-300'>Days left</span>
            </div>

            <div className='p-2 rounded-lg border border-stone-400 bg-stone-800/50 grow'>
              <div className='flex justify-between gap-2'>
                <span className='text-[18px] font-bold text-stone-200 leading-tight'>
                  {props.campaign.amountCollected}
                  <span className='text-xs text-stone-400'> ETH</span>
                </span>
                <span className='text-right text-[18px] font-bold text-stone-200 leading-tight'>
                  {props.campaign.target}
                  <span className='text-xs text-stone-400'> ETH</span>
                </span>
              </div>
              <div className='flex justify-between gap-4'>
                <span className='text-sm text-stone-300'>{calculateBarPercentage(props.campaign.target, props.campaign.amountCollected)}%</span>
                <span className='text-sm text-stone-300'>100%</span>
              </div>
              <div className='relative w-full h-[5px] bg-stone-800 md:bg-stone-600'>
                <div 
                  className='absolute h-full bg-stone-200'
                  style={{width: `${calculateBarPercentage(props.campaign.target, props.campaign.amountCollected)}%`, maxWidth: "100%"}}
                ></div>
              </div>
            </div>

            <div className='p-2 flex flex-col items-center rounded-lg border border-stone-400 bg-stone-800/50 text-center'>
              <span className='text-[18px] font-bold text-stone-200'>{donators.length}</span>
              <span className='text-sm text-stone-300'>Donators</span>
            </div>
          </div>

          {donators.length > 0 && (
            <div className='mb-12 p-2 w-full flex gap-2 rounded-lg bg-stone-800/35 backdrop-blur md:mb-4 md:p-0'>
              <ul className='p-2 flex flex-col items-center rounded-lg border border-stone-400 bg-stone-800/50'>
                {donators.map(donation => {
                  return <li className='border-b border-stone-400 last-of-type:border-0'>
                    <span className='text-[18px] font-bold text-stone-200'>{donation.donation}</span>
                    <span className='text-sm text-stone-300 break-all'> donated by {donation.donator}</span>
                  </li>
                })}
              </ul>
            </div>
          )}
        </div>

        <div 
          className='
            absolute top-0 left-0 w-full h-full max-h-full
            md:static md:w-1/3 md:h-[750px]
          '>
          <img 
            src={props.campaign.image} 
            alt="hero image" 
            width={"320px"} 
            className='w-full h-full rounded-lg object-cover md:rounded-l-none'
          />
        </div>
        <button 
          onClick={() => {
            props.setVisible(false)
            document.body.style.overflow = "auto"
          }}
          className='absolute z-10 top-0 right-0 m-1 p-3 rounded-full transition-all duration-300 hover:bg-stone-800'
          >
          <img src="/icons/close.png" alt="close" width={"18px"} />
        </button>
      </div>
    </div>
  )
}
