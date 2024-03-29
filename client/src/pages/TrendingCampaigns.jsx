import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context'
import CampaignCard from '../components/CampaignCard'
import CreateCampaign from '../components/CreateCampaign'
import CampaignDetails from '../components/CampaignDetails'
import Loader from '../components/Loader'

export default function TrendingCampaigns() {
    const [isLoading, setIsLoading] = useState(false)
    const [campaigns, setCampaigns] = useState([])
    const [isCreateCampaignVisible, setIsCreateCampaignVisible] = useState(false)
    const [isDetailsVisible, setIsDetailsVisible] = useState(false)
    const [campaignInfo, setCampaignInfo] = useState()

    const { address, contract, getCampaigns } = useStateContext()

    useEffect(() => {
        if(contract) {
        const fetchCampaigns = async() => {
            setIsLoading(true)

            const data = await getCampaigns()
            setCampaigns(data)
            
            setIsLoading(false)
        }
        
        fetchCampaigns()
        }
    }, [address, contract])


    return (
        <main className='p-4 grow flex flex-col justify-center text-white overflow-hidden md:p-8 md:max-h-screen'>
            <div className="mb-4 flex items-center justify-between gap-2 flex-wrap" >
                <h1 className='text-[24px] lg:text-[32px] font-semibold'>
                Trending Campaigns
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
                {isLoading && <Loader /> }

                {!isLoading && campaigns.length === 0 && (
                    <div className='h-fit m-auto p-8 bg-[#FBB2A9]/5 rounded-lg border border-[#F86754] text-center'>
                        <p className='mb-4'>
                            <span className='text-[#F86754] font-medium'>No campaigns yet.</span>  Now's your chance to position your campaign at the forefront.
                            <span className='block'>It's time to create something extraordinary!</span>
                        </p>
                        <button className='btn-primary'>Create a new campaign</button>
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
                )}
            </div>

            {/* MODALS */}
            {isCreateCampaignVisible ? <CreateCampaign setVisible={setIsCreateCampaignVisible} /> : null}
            {isDetailsVisible ? <CampaignDetails setVisible={setIsDetailsVisible} campaign={campaignInfo} /> : null}
        </main>
    )
}
