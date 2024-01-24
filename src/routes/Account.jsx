import React from 'react'
import { useNavigate } from 'react-router-dom';

import { UserAuth } from '../context/AuthContext'
import SavedCoin from '../components/SavedCoin';

const Account = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogOut = async (e) =>{
    e.preventDefault();
    try{
    await logOut()
    navigate('/')
    }catch(e){
    console.log(e.message)
    }
  }


  return (
    <div className=''>
     <div className='rounded-div shadow-2xl py-5 my-12'>
        <div className='p-3'>
          <h2 className='text-xl font-bold'>Account</h2>
          <div className='flex justify-between'>
            <p>Welcome {user?.email}</p>
            <button onClick={handleLogOut}className='flex justify-center border rounded-2xl my-auto px-5 py-1 text-sm shadow-lg hover:shadow-xl'>Sign Out</button>
          </div>
        </div>
     </div>

     <div className='rounded-div shadow-2xl min-h-[300px] my-10'>
        <div className='px-3 py-6'>
          <h2 className='text-xl font-bold'>Watch List</h2>
          <div className=''>
             <SavedCoin/>
          </div>
        </div>
     </div>

    </div>
  )
}

export default Account