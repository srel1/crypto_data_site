import React, { useContext } from 'react'
import {BsMoonFill, BsSunFill} from 'react-icons/bs'
import { ThemeContext } from '../context/ThemeContext'

const ThemeToggle = () => {
    const {theme, setTheme} = useContext(ThemeContext)
  return (
    <div className='hover:cursor-pointer'>
      {theme === "dark" ? (
        <div className='flex items-center' onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <BsSunFill size={19} className="mr-1"/>
          <h2>Light Mode</h2>
        </div>
      ) : (
        <div className='flex items-center' onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <BsMoonFill size={19} className="mr-1"/>
          <h2>Dark Mode</h2>
        </div>
      )}
    </div>
  );
}

export default ThemeToggle