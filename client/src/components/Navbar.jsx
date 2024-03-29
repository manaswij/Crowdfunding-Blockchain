import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { navlinks } from '../constants'
import { useStateContext } from '../context'

export default function Navbar() {
  const [isMenuVisisble, setIsMenuVisisble] = useState(false)

  const links = navlinks.map(link => {
    return <li key={link.name}>
      <Link 
        to={link.link} 
        className='flex gap-2 mb-2 p-3 text-stone-300 bg-stone-800 rounded-lg'
      >
        <img src={link.icon} alt="icon" width={"24px"} />
        {link.name}
      </Link>
    </li>
  })

  const { connectWallet, address, disconnect, walletInstance } = useStateContext()

  return (
    <header
      className='
        relative z-20 p-4 flex border-stone-800 max-h-screen
        md:p-0 md:border-r-2'
    >
      <button 
        onClick={ () => { 
          setIsMenuVisisble(true)
          document.body.style.overflow = "hidden" 
        }} 
        className='md:hidden'>
        <img src="/icons/menu.png" alt="menu" />
      </button>
      <div className='grow md:hidden'>
        <img 
          src="/brand/pathreeon-color.png" 
          alt="logo" 
          width={"150px"} 
          className='mx-auto'
        />
      </div>
      
      <nav className={`
        absolute z-10 top-0 left-0 w-full h-screen flex -translate-x-full transition-transform duration-300
        ${isMenuVisisble ? "translate-x-0" : ""}
        md:static md:translate-x-0 md:w-52
        lg:w-60`
      }>
        <div className='
          w-5/6 max-w-96 h-full bg-stone-900 flex flex-col
          md:w-full'
          >
          <div className='flex justify-between items-center px-4 py-6'>
            <Link to="/">
              <img src="/brand/p3.png" alt="logo" width={"24px"} />
            </Link>
            <button 
              onClick={ () => { 
                setIsMenuVisisble(false)
                document.body.style.overflow = "auto"
              }} 
              className='md:hidden' >
              <img src="/icons/close.png" alt="menu" width={"18px"} />
            </button>
          </div>

          <ul className='px-4 grow'>
            {links}
          </ul>
          
          <div className='p-4 border-t-2 border-stone-800'>
            { address == undefined ? (
              <button onClick={() => {connectWallet()}} className='btn-secondary w-full'>Connect wallet</button>
              ) : (
              <div className='flex flex-col gap-2'>
                <div>
                  <p className='font-medium text-stone-100 capitalize'>{walletInstance.walletId}</p>
                  <p className='text-sm	text-stone-500 break-all'>{address}</p>
                </div>
                <button onClick={() => {disconnect()}} className='btn-secondary'>Disconnect wallet</button>
              </div>
            ) }
            <div>
            </div>
          </div>
        </div>
        <div 
          onClick={ () => { 
            setIsMenuVisisble(false)
            document.body.style.overflow = "auto"
          }} 
          className='w-1/6 h-full grow backdrop-blur md:hidden' 
        ></div>
      </nav>
    </header>
  )
}
