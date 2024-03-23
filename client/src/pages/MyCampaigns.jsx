import React, { useEffect, useState } from 'react'
import CreateCampaign from '../components/CreateCampaign'
import { useStateContext } from '../context'
import CampaignCard from '../components/CampaignCard'
import CampaignDetails from '../components/CampaignDetails'

export default function Campaigns() {
  const [isCreateCampaignVisible, setIsCreateCampaignVisible] = useState(false)
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const [campaignInfo, setCampaignInfo] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])

  const { address, contract, getUserCampaigns } = useStateContext()

  useEffect(() => {
    if(contract) {
      const fetchCampaigns = async() => {
        setIsLoading(true)

        const data = await getUserCampaigns()
        setCampaigns(data)
        
        setIsLoading(false)
      }
      
      fetchCampaigns()
    }
  }, [address, contract])
  
  return (
    <main className='w-full text-white'>
      <div className="flex justify-between" >
        <h1>
          My Campaigns
          <span>{campaigns.length}</span>
        </h1>
        <button onClick={() => {setIsCreateCampaignVisible(true)}} >Create campaign</button>
      </div>
      <div>
        {isLoading && (
          <img src="/images/avatar.png"  alt="loader" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <div>
            <p>You have no campaigns created yet. Create a new one in a minute!</p>
            <button onClick={() => {setIsCreateCampaignVisible(true)}} >Create new campaign</button>
          </div>
        )}

        {
          !isLoading && campaigns.length > 0 && campaigns.map(
            (campaign) => <CampaignCard 
              key={campaign.id}
              {...campaign}
              handleClick={() => {setIsDetailsVisible(true), setCampaignInfo(campaign) }}
            />
          )
        }
      </div>
      

      {/* MODALS */}
      {isCreateCampaignVisible ? <CreateCampaign setVisible={setIsCreateCampaignVisible} /> : null}
      {isDetailsVisible ? <CampaignDetails setVisible={setIsDetailsVisible} campaign={campaignInfo} /> : null}
    </main>
  )
}
