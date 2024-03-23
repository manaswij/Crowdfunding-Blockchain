import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context'
import CampaignCard from '../components/CampaignCard'

export default function TrendingCampaigns() {
    const [isLoading, setIsLoading] = useState(false)
    const [campaigns, setCampaigns] = useState([])

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
        <main className='text-white'>
            <h1>
                Trending Campaigns
                <span>{campaigns.length}</span>
            </h1>
            <div>
                {isLoading && (
                <img src="/images/avatar.png"  alt="loader" />
                )}

                {!isLoading && campaigns.length === 0 && (
                <div>
                    <p>You have no campaigns created yet. Create a new one in a minute!</p>
                    <button onClick={() => {setIsModalVisible(true)}} >Create new campaign</button>
                </div>
                )}

                {
                !isLoading && campaigns.length > 0 && campaigns.map(
                    (campaign) => <CampaignCard 
                    key={campaign.id}
                    {...campaign}
                    handleClick={() => {}}
                    />
                )
                }
            </div>
        </main>
    )
}
