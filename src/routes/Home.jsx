import React, {useEffect} from 'react'
import CoinSearch from '../components/CoinSearch'
import TrendingCoins from '../components/TrendingCoins';

const Home = ({coins}) => {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  

  return (
    <div>
      <div className="rounded-div mt-4 p-4 text-sm lg:text-base">
        <CoinSearch coins={coins}/>
      </div>
      <TrendingCoins/>
    </div>
  );
}

export default Home