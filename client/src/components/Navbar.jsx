import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { navlinks } from '../constants'
import { useStateContext } from '../context'

export default function Navbar() {
  const [isMenuVisisble, setIsMenuVisisble] = useState(false)
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true)

  const links = navlinks.map(link => {
    return <li key={link.name} className='block'>
      <Link 
        to={link.link} 
        className='nav__link flex items-center gap-2 mb-2 p-3 text-slate-300 bg-slate-800 rounded-lg'
      >
        <img src={link.icon} alt="icon" width={"24px"} height={"24px"} className='w-6 h-6' />
        <span 
          className={`max-h-6 origin-left transition-all text-nowrap
          ${isMenuCollapsed ? "md:scale-x-0 md:max-w-0 md:opacity-0" : "md:scale-x-1 md:max-w-28 md:opacity-100"} 
          lg:scale-x-100 lg:max-w-none lg:opacity-100
          `} >
          {link.name}
        </span>        
      </Link>
    </li>
  })

  const { connectWallet, address, disconnect, walletInstance } = useStateContext()

  return (
    <header
      className='shrink-0 relative z-20 p-4 flex max-h-screen md:p-2'>
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
        md:static md:translate-x-0 md:w-auto md:h-full md:shadow-xl
        lg:w-max`
      }>
        <div className='
          w-5/6 max-w-96 h-full px-4 flex flex-col bg-slate-800/75 border-r-2 border-slate-600 backdrop-blur
          md:w-full md:border md:rounded-lg'
          >
          <div className='flex justify-between items-center py-6'>
            <Link 
              to="/" 
              className={`${isMenuCollapsed ? "md:scale-x-0 md:opacity-0" : "md:opacity-100"} lg:scale-x-100 lg:opacity-100`}>
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

            <button 
              onClick={ () => { 
                setIsMenuCollapsed(!isMenuCollapsed)
              }} 
              className='hidden md:block lg:hidden'>
              <img 
                src="/icons/chevron-right.png" 
                alt="menu" 
                width={"18px"}
                className={`${isMenuCollapsed ? "" : "rotate-180"} transition-transform`} 
              />
            </button>
          </div>

          <ul className='grow'>
            {links}
          </ul>
          
          <div 
            className={`
              py-4 border-t border-slate-600 origin-left transition-all
              ${isMenuCollapsed ? "md:hidden md:opacity-0" : "md:block md:opacity-100"} 
              lg:block lg:opacity-100
            `}>
            { address == undefined ? (
              <button onClick={() => {connectWallet()}} className='btn-secondary w-full'>Connect wallet</button>
              ) : (
              <div className='flex flex-col gap-2'>
                <div>
                  <p className='font-medium text-slate-100 capitalize'>{walletInstance.walletId}</p>
                  <p className='text-sm	text-slate-500 break-all'>{address}</p>
                </div>
                <button onClick={() => {disconnect()}} className='btn-secondary'>Disconnect wallet</button>
              </div>
            ) }
          </div>
        </div>
        <div 
          onClick={ () => { 
            setIsMenuVisisble(false)
            document.body.style.overflow = "auto"
          }} 
          className='w-1/6 h-full grow bg-[#000000]/50 backdrop-blur md:hidden' 
        ></div>
      </nav>
    </header>
  )
}
