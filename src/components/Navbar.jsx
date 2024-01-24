import React from 'react'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { Link, useNavigate }from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

import ThemeToggle from './ThemeToggle'
  
const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false)

  const handleLogout = async (e) => {
    e.preventDefault();
    try{
      await logOut()
      navigate('/')
    }catch(e){
      console.log(e.message)
    }
  }

  const handleSidebar = () => {
    setMobile(!mobile)
  }
  
  const mobileSignOut = (e) => {
    handleSidebar()

    setTimeout(() => {
    handleLogout(e)
    }, 200);
  }

  return (
    <div>
      <div className="flex justify-between rounded-div py-6 px-2 bg-primary items-center shadow-lg">
        <div>
          <Link to="/">
            <h1 className="font-bold text-2xl text-secondary">Cryptobase</h1>
          </Link>
        </div>

        <div className="hidden md:flex">
          <ThemeToggle />
        </div>

        {user ? (
          <div className="hidden md:flex">
            <Link className="flex my-auto" to="/account">
              <button className="flex my-auto justify-center items-center">
                Account
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="ml-5 text-btnText font-bold bg-button rounded-2xl px-5 py-2 hover:"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="hidden md:flex">
            <Link className="flex my-auto" to="/login">
              <button className="flex my-auto justify-center items-center">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="ml-5 text-btnText font-bold bg-button rounded-2xl px-5 py-2 hover:">
                Sign Up
              </button>
            </Link>
          </div>
        )}
        <div className="flex md:hidden items-center px-2 cursor-pointer">
          <AiOutlineMenu onClick={handleSidebar} size={20} />
          {/* { mobile ? <AiOutlineClose onClick={handleSidebar} size={20}/>: <AiOutlineMenu onClick={handleSidebar} size={20} />} */}
        </div>
      </div>

      <div
        className={
          mobile
            ? "z-20 md:hidden fixed left-0 top-0 flex flex-col justify-between w-full h-[100%] bg-primary ease-in duration-300"
            : "z-10 fixed left-[-100%] top-0 h-[100%] flex flex-col justify-between ease-in duration-300"
        }
      >
        <ul className="p-4 w-full">
          <li className='flex justify-end pt-4'>
            { mobile ? <AiOutlineClose onClick={handleSidebar} size={20}/>: <AiOutlineMenu onClick={handleSidebar} size={20} />}

          </li>
          <li className="border-b py-6">
            <Link to="/" onClick={handleSidebar}>Home</Link>
          </li>
          <li className="border-b py-6">
            <Link to={user === null ? "/login" : "/account"}>
              <button onClick={handleSidebar}>Account</button>
            </Link>
          </li>
          <li className="py-6">
            <ThemeToggle/>
          </li>
        </ul>

        <div className='px-4'>
          <div className='py-2'>
            <Link to='/login'>
              <button onClick={handleSidebar} className={user !== null ? 'hidden': 'w-full bg-primary rounded-2xl px-5 py-3 shadow-2xl border border-secondary'}>Sign In</button>
            </Link>
          </div>
          <div className='pt-2 pb-6'>
            <div className={user !== null ? '': 'hidden'}>
              <Link>
                <button onClick={(e) => mobileSignOut(e)} className='w-full text-btnText bg-button rounded-2xl px-5 py-3 shadow-2xl'>Sign Out</button>
              </Link>
            </div>
            <div className={user !== null ? 'hidden': ''}>
              <Link to='/signup'>
                <button onClick={handleSidebar} className='w-full text-btnText bg-button rounded-2xl px-5 py-3 shadow-2xl'>Sign Up</button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Navbar