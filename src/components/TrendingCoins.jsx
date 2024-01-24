import React, {useState, useEffect} from 'react'
import axios from 'axios'


const TrendingCoins = () => {
    const [trendingCoins, setTrendingCoins]  = useState([])
    const url = 'https://api.coingecko.com/api/v3/search/trending'
    const svgURL = 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg'

    useEffect(()=>{
        axios.get(url)
        .then(response =>{
            setTrendingCoins(response.data.coins)
            //console.log(response.data.coins, 'trending coins')
        })
        .catch(error => {
            console.log(error)
        })
    },[url])

  return (
    <div className="rounded-div mt-6 text-base">
      <div className="flex text-left text-xl mt-8 py-1 px-2">
        <h1 className="text-2xl font-bold">Trending Coins</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-1 py-3">
        {trendingCoins.map((coin) => (
          <div
            key={coin.item.id}
            className="rounded-div flex justify-between py-4 px-2 hover:scale-105 ease-in-out duration-300"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex">
                <img
                  className="mr-4 rounded-full"
                  src={coin.item.small}
                  alt={coin.item.name}
                />
                <div>
                  <p className="font-bold">{coin.item.name}</p>
                  <p>{coin.item.symbol}</p>
                </div>
              </div>

              <div className="flex items-center">
                <img className="w-4 mr-2" src={svgURL} alt="bitcoin-logo" />
                <p>{coin.item.price_btc.toFixed(7)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingCoins

