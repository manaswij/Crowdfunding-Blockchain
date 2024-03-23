import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context';
import { calculateBarPercentage, daysLeft } from '../utils';

export default function CampaignDetails(props) {
  console.log(props.campaign);
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
    <div className='fixed top-0 left-0 z-10 w-full h-full p-4 backdrop-blur'>
      {isLoading && "Loading..."}

      <div className='
        w-full max-w-3xl m-auto p-8 rounded-lg bg-[url("/images/bg-rocketlaunch.webp")] bg-no-repeat bg-cover
        '>
        <div className='overflow-y-auto'>
          <h2>Campaign Details</h2>
          <button onClick={() => {props.setVisible(false)}}>Close</button>

          <div className='relative w-full h-[5px] bg-stone-600'>
            <div 
              className='absolute h-full bg-stone-200'
              style={{width: `${calculateBarPercentage(props.campaign.target, props.campaign.amountCollected)}%`, maxWidth: "100%"}}
            >
            </div>
          </div>

          <div>
            <h2>{props.campaign.title}</h2>
            <img src={props.campaign.image} alt="hero image" width={"100px"} />
            <p>{props.campaign.description}</p>
          </div>

          <div>
            <p>{props.campaign.amountCollected}</p>
            <p>Raised of {props.campaign.target}</p>
          </div>

          <div>
            <p>{remainingDays}</p>
            <p>Days left</p>
          </div>
          
          <div>
            <p>Donators</p>
            <p>{donators.length}</p>
            {donators.map(donation => {
              return <div>
                <p>{donation.donator}</p>
                <p>{donation.donation}</p>
              </div>
            })}
          </div>
          
          <div>
            <img src="/brand/p3.png" alt="logo" width={"24px"} />
            <p>by {props.campaign.owner}</p>
          </div>

          <div>
            <p>Donate</p>
            <input 
              type="number" 
              placeholder='ETH 0.1'
              step={"0.01"}
              value={amount}
              onChange={(e) => {setAmount(e.target.value)}}
              className='text-black'
            />
            <p>Support your creator for no reward just because you believe in the cause</p>
            <button type='button' onClick={handleDonate} >Fund Campaign</button>
          </div>
        </div>
      </div>
    </div>
  )
}
