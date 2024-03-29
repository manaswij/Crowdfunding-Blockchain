import React, { useEffect, useState } from 'react'
import CreateCampaign from '../components/CreateCampaign'
import { useStateContext } from '../context'
import CampaignCard from '../components/CampaignCard'
import CampaignDetails from '../components/CampaignDetails'
import Loader from '../components/Loader'

export default function Campaigns() {
  const [isCreateCampaignVisible, setIsCreateCampaignVisible] = useState(false)
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const [campaignInfo, setCampaignInfo] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])

  const { address, contract, getUserCampaigns, connectWallet } = useStateContext()

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
    <main className='p-4 grow flex flex-col justify-center text-white md:p-8 md:max-h-screen'>
      <div className="mb-4 flex items-center justify-between gap-2 flex-wrap" >
        <h1 className='text-[24px] lg:text-[32px] font-semibold'>
          My Campaigns
          {!isLoading && address != null && (
            <span className='text-[18px] lg:text-[24px]'> ({campaigns.length})</span>
          )}
        </h1>
        { campaigns.length > 0 && (
          <button 
            onClick={() => {
              setIsCreateCampaignVisible(true)
              document.body.style.overflow = "hidden"
            }} 
            className='btn-primary'>
            Create campaign
          </button>
        )}
      </div>
      
      <div className='flex justify-evenly gap-4 flex-wrap overflow-y-auto'>
        {isLoading && (
          <Loader />
        )}

        {!isLoading && address == null && (
          <div>
            <p className='mb-2'>Connect your account to see your campaigns or create a new one!</p>
            <button onClick={() => {connectWallet()}} className='btn-primary'>
              Connect wallet
            </button>
          </div>
        )}

        {!isLoading && address != null && campaigns.length === 0 && (
          <div>
            <p className='mb-2'>You have no campaigns created yet. Create a new one now!</p>
            <button onClick={() => {setIsCreateCampaignVisible(true)}} className='btn-primary'>
              Create new campaign
            </button>
          </div>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map(
          (campaign) => <CampaignCard 
            key={campaign.pId}
            {...campaign}
            handleClick={() => {
              setIsDetailsVisible(true)
              setCampaignInfo(campaign)
              document.body.style.overflow = "hidden"
            }}
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
