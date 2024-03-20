import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { navlinks } from '../constants'

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


  return (
    <header
      className='
        relative p-4 flex 
        md:p-0 md:border-r-2 md:border-stone-800
        lg:w-60'
    >
      <button onClick={ () => { setIsMenuVisisble(true)} } className='md:hidden'>
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
        absolute top-0 left-0 w-full h-screen flex -translate-x-full transition-transform duration-300
        ${isMenuVisisble ? "translate-x-0" : ""}
        md:static md:translate-x-0`
      }>
        <div className='
          w-5/6 h-full bg-stone-900 flex flex-col
          md:w-full'
        >
          <div className='flex justify-between items-center px-4 py-6'>
            <Link to="/">
              <img src="/brand/p3.png" alt="logo" width={"24px"} />
            </Link>
            <button onClick={ () => { setIsMenuVisisble(false)} } className='md:hidden' >
              <img src="/icons/close.png" alt="menu" width={"18px"} />
            </button>
          </div>

          <ul className='px-4 grow'>
            {links}
          </ul>
          
          <Link 
            to="/profile"
            className='flex items-center gap-2 p-4 border-t-2 border-stone-800'
          >
            <img 
              src="/images/avatar.png" 
              alt="avatar" 
              width={"48px"} 
              className='sepia rounded-full border border-stone-300 animate-spin duration-300' 
            />
            <div>
              <p className='font-medium text-stone-100'>Leandro</p>
              <p className='text-sm	text-stone-500'>Creator</p>
            </div>
          </Link>
        </div>
        <div 
          onClick={ () => { setIsMenuVisisble(false)} } 
          className='w-1/6 h-full bg-stone-950/[0.65] backdrop-blur-3xl mix-blend-hue md:hidden' 
        ></div>
      </nav>
    </header>
  )
}
