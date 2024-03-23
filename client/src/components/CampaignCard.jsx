import React from 'react'
import { daysLeft } from '../utils'

export default function CampaignCard(props) {
  const remainingDays = daysLeft(props.deadline)

  return (
    <div key={props.key} className='w-1/4' onClick={props.handleClick}>
      <img src={props.image} alt="heroimage" />

      <div>
        <p>Tag: Education</p>
      </div>

      <div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>

      <div>
        <p>{props.amountCollected}</p>
        <p>Raised of {props.target}</p>
      </div>

      <div>
        <p>{remainingDays}</p>
        <p>Days left</p>
      </div>
      
      <div>
        <img src="/brand/p3.png" alt="logo" />
        <p>by {props.owner}</p>
      </div>
    </div>
  )
}
