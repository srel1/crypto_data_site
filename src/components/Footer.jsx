import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa'
   
import ThemeToggle from './ThemeToggle'

    const Footer = () => {
    return (
      <div className="rounded-div mt-12">
        <div className="md:flex md:justify-between">
          <div className="flex justify-center gap-[155px] md:flex md:justify-between md:gap-10 py-8 px-12">
            <div className='text-md'>
              <p className="font-bold">Support</p>
              <p className="text-md py-2">Help Center</p>
              <p className="text-md py-2">Contact Us</p>
              <p className="py-2">API Status</p>
              <p className="py-2">Documentation</p>
            </div>
            <div className='text-md'>
              <p className="font-bold">Info</p>
              <p className="py-2">About Us</p>
              <p className="py-2">Careers</p>
              <p className="py-2">Invest</p>
              <p className="py-2">Legal</p>
            </div>
          </div>

          <div className="py-2 md:py-10 px-2 md:px-3 text-right w-full md:w-auto">
            <div className="flex justify-center md:justify-end">
              <ThemeToggle />
            </div>
            <p className="text-center md:text-right py-3">
              Sign up for crypto news
            </p>
            <div className="flex-col md:flex py-4">
              <form>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="bg-primary border border-input rounded-2xl shadow-xl mr-2 py-2 px-3 w-full md:w-auto mb-2"
                ></input>
                <button className="bg-button text-btnText rounded-2xl px-3 py-2 w-full md:w-auto">
                  Sign Up
                </button>
              </form>
            </div>
            <div className="flex py-6 w-full text-accent justify-between">
              <a href='https://www.instagram.com/coingecko/' target='_blank' rel="noreferrer"><FaInstagram className='cursor-pointer' size={15} /></a>
              <a href='https://www.tiktok.com/@coingeckotv' target='_blank' rel="noreferrer"><FaTiktok className='cursor-pointer' size={15} /></a>
              <a href='https://twitter.com/coingeckoblank' target='_blank' rel="noreferrer"><FaTwitter className='cursor-pointer'size={15} /></a>
              <a href='https://www.facebook.com/coingecko' target='_blank' rel="noreferrer"><FaFacebook className='cursor-pointer' size={15} /></a>
              <a href='https://github.com/' target='_blank' rel="noreferrer"><FaGithub className='cursor-pointer' size={15} /></a>
            </div>
          </div>
        </div>
        <p className="text-center mb-4">Powered by Coin Gecko</p>
      </div>
    );
    }

    export default Footer