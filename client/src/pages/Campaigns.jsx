import React, { useState } from 'react'
import CreateCampaign from '../components/CreateCampaign'

export default function Campaigns() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  
  return (
    <div className='text-white'>
      Campaigns
      <button onClick={() => {setIsModalVisible(true)}} >Create campaign</button>
      
      {isModalVisible ? <CreateCampaign /> : null}
    </div>
  )
}
