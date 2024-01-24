import React, { useEffect, useState } from 'react'
import { AiFillLock, AiOutlineMail } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signUp } = UserAuth();

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signUp(email, password)
      navigate('/account')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }

  return (
    <div className='mt-20 max-w-[400px] min-h-[600px] mx-auto px-2 text-base'>
      <div>
        <h2 className='font-bold text-2xl'>Sign Up</h2>
        {error ? <p className='text-red-600 text-sm my-2'>Error: invalid credentials, try again</p> : null} {/*Error: invalid credentials, try again.*/}
        <form onSubmit={handleSubmit} className='flex flex-col py-3'>
          <p className='mb-2'>Email</p>
          <div className='w-full relative rounded-2xl shadow-xl mb-2'>
            <input onChange={(e) => setEmail(e.target.value)} className='w-full bg-primary px-2 p-2 rounded-2xl border border-input' type='text' placeholder='Enter your email'></input>
            <AiOutlineMail className='absolute right-2 top-3 text-gray-300'/>
          </div>
          <p className='mb-2'>Password</p>
          <div className='w-full relative rounded-2xl shadow-xl mb-4'>
            <input onChange={(e) => setPassword(e.target.value)} className='w-full bg-primary px-2 p-2 rounded-2xl border border-input' type='password' placeholder='Enter your password'></input>
            <AiFillLock className='absolute right-2 top-3 text-gray-300'/>
          </div>
          <button className='bg-button text-btnText rounded-xl p-3 my-2'>Sign Up</button>
        </form>
        <p>Alreade have an account?<Link className='ml-1 text-accent' to='/login'>Sign In</Link></p>
      </div>
    </div>
  )
}

export default SignUp