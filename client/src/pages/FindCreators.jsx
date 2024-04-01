import React from 'react'
import { exploreCategories } from '../constants'

export default function FindCreators() {
  const categories = exploreCategories.map(category => {
    return <li key={category}>
      <button className='py-2 px-3 rounded-lg bg-slate-800 text-sm font-medium'>
        {category}
      </button>
    </li>
  })

  return (
    <main className='grow flex flex-col justify-center text-white'>
      <div className='w-10/12 mx-auto'>
        <h1 className='mb-4 text-[32px] font-semibold'>Find creators</h1>
        <div className='relative text-center'>
          <input 
            type="text"
            placeholder='Search creators or themes'
            className='w-full h-10 pl-10 bg-slate-900 rounded-full border border-slate-300'
          />
          <img 
            src="/icons/search.png" 
            alt="search" 
            width={"18px"} 
            className='absolute top-1/2 left-4 -translate-y-1/2'
          />
        </div>
        <ul className='mt-3 flex justify-center flex-wrap gap-2'>
          {categories}
        </ul>
      </div>
    </main>
  )
}
