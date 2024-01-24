import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FaFacebook, FaGithub, FaReddit, FaServer } from 'react-icons/fa'
import DOMPurify from 'dompurify';
import {useParams} from 'react-router-dom';

const CoinPage = () => {
  const params = useParams();
  const [coin1, setCoin1] = useState([]);
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`
  
  useEffect(()=>{
    axios.get(url)
    .then((response)=>{
      setCoin1(response.data)
      //console.log(response.data, 'single coin')
    })
    .catch((error) =>{
      console.log(error)
    })
    window.scrollTo(0,0)
  }, [url])

  return (
    <div key={coin1.id} className="rounded-div mt-16 px-3">
      <div className="flex mt-16">
        <div>
          <img
            className="items-center"
            src={coin1.image?.small}
            alt={coin1.name}
            width={80}
          />
        </div>
        <div className="flex flex-col ml-6">
          <h1 className="font-bold text-3xl">{coin1.name} price</h1>
          <h1 className="text-xl">({coin1.symbol?.toUpperCase()}/USD)</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">

        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-2xl">
              ${coin1.market_data?.current_price.usd.toLocaleString() < 0.000001 ?
                coin1.market_data?.current_price.usd.toLocaleString(undefined,{ maximumFractionDigits: 7})
                : 
                coin1.market_data?.current_price.usd.toLocaleString()
              }
            </h1>
            <p className="ml-1 text-sm">7 Day</p>
          </div>
          <div>
            <Sparklines data={coin1.market_data?.sparkline_7d.price}>
              <SparklinesLine color="teal" />
            </Sparklines>
          </div>

          <div className='grid grid-cols-2 gap-2 mt-3 '>
            <div className='justify-start text-left'>
              <h2 className='text-gray-500 text-sm'>Market Cap</h2>
              <p>${coin1.market_data?.market_cap.usd.toLocaleString()}</p>
            </div>

            <div className='justify-end text-right'>
              <h2 className='text-gray-500 text-sm'>Volume (24h)</h2>
              <p>${coin1.market_data?.total_volume.usd.toLocaleString()}</p>
            </div>

            <div className='text-left'>
              <h2 className='text-gray-500 text-sm'>24h High</h2>
              {coin1.market_data?.high_24h ? (
              <p>${coin1.market_data.high_24h.usd.toLocaleString() < 0.000001 ? 
                coin1.market_data.high_24h.usd.toLocaleString(undefined,{ maximumFractionDigits: 7}) : coin1.market_data.high_24h.usd.toLocaleString()}
              </p>
              ) : 
              "No Data"}
            </div>

            <div className='text-right'>
              <h2 className='text-gray-500 text-sm'>24h Low</h2>
              {coin1.market_data?.low_24h ? (
              <p>${coin1.market_data?.low_24h.usd.toLocaleString() < 0.000001 ? coin1.market_data?.low_24h.usd.toLocaleString(undefined,{ maximumFractionDigits: 7}) 
              : coin1.market_data?.low_24h.usd.toLocaleString()}
              </p>
              ) : 
              "No Data"}
            </div>
          </div>
        </div>

        <div>
          <div>
            <h2 className='font-bold text-lg'>Market Stats</h2>
          </div>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Market Rank</p>
              <p>{coin1.market_cap_rank}</p>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Hashing Algorithm</p>
              <p className='text-wrap max-w-[120px]'>{coin1.hashing_algorithm ? coin1.hashing_algorithm : "N/A"}</p>
            </div>
            <div className='text-right text-sm'>
              <p className='text-gray-500 text-sm'>Ledger Start</p>
              <p>{coin1.genesis_date ? coin1.genesis_date : "N/A"}</p>
            </div>
          </div>

          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (24h)</p>
              <p>${coin1.market_data?.price_change_24h.toFixed(2)}</p>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (7d)</p>
              <p>{coin1.market_data?.price_change_percentage_7d.toFixed(2)}%</p>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (14d)</p>
              <p>{coin1.market_data?.price_change_percentage_14d.toFixed(2)}%</p>
            </div>
          </div>

          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (30d)</p>
              <p>{coin1.market_data?.price_change_percentage_30d.toFixed(2)}%</p>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (60d)</p>
              <p>{coin1.market_data?.price_change_percentage_60d.toFixed(2)}%</p>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (1y)</p>
              <p>{coin1.market_data?.price_change_percentage_1y.toFixed(2)}%</p>
            </div>
          </div>

          <div className='flex mt-10 items-center justify-center text-accent'>
              <a href={coin1.links?.homepage[0]} target='_blank' rel='noreferrer'><FaServer className='mr-10'/></a>
              <a href={`https://www.facebook.com/${coin1.links?.facebook_username}`} target='_blank' rel='noreferrer'><FaFacebook className='mr-10'/></a>
              <a href={coin1.links?.repos_url.github[0]} target='_blank' rel='noreferrer'><FaGithub className='mr-10'/></a>
              <a href={coin1.links?.subreddit_url} target='_blank' rel='noreferrer'><FaReddit className='mr-10'/></a>
          </div>
        </div>

      </div>

      <div className='py-4'>
          <p className='font-bold text-lg '>About {coin1.name}</p>
          <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(coin1.description ? coin1.description.en : '' )}}></p>
      </div>

    </div>
  );
}

export default CoinPage

