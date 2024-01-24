import { arrayUnion, updateDoc } from 'firebase/firestore';
import React, { useState} from 'react'
import { AiFillStar, AiOutlineStar }from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines'
import { UserAuth }from '../context/AuthContext'
import { db } from '../firebase'
import { doc} from 'firebase/firestore';

const CoinItem = ({coin, alSaved}) => {
  const [savedCoins, setSavedCoins] = useState(false);
  const { user } = UserAuth();

  const coinPath = doc(db, 'users', `${user?.email}`)
  const saveCoin = async () =>{
    if(user?.email){
    setSavedCoins(true);
    await updateDoc(coinPath, {
      watchList: arrayUnion({
        id: coin.id,
        rank: coin.market_cap_rank,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
      }),
    });
  } else{
    alert('Please log in to save a coin to your watchlist.')
    }
  };


  return (
    <tr className="h-[80px] border-b overflow-hidden">
      <td>
        { savedCoins || alSaved ? (<AiFillStar />) : (<AiOutlineStar onClick={saveCoin} />)}
      </td>
      <td>{coin.market_cap_rank}</td>

      <td>
        <Link to={`/coin/${coin.id}`}>
          <div className="flex items-center">
            <img
              className="mr-2 w-6 rounded-full"
              src={coin.image}
              alt="coin-logo"
            />
            <p className="hidden sm:table-cell">{coin.name}</p>
          </div>
        </Link>
      </td>

      <td className="col-span-1">{coin.symbol.toUpperCase()}</td>
      <td className={coin.current_price.toLocaleString() < 0.000001 && 'text-sm'}>
        ${coin.current_price.toLocaleString() < 0.000001 ? 
        coin.current_price.toLocaleString(undefined,{ maximumFractionDigits: 7}) 
        : 
        coin.current_price.toLocaleString()}
      </td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
          <p className="text-green-500">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        ) : (
          <p className="text-red-500">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        )}
      </td>
      <td className="hidden w-[180px] md:table-cell">
        <p>{coin.total_volume.toLocaleString()}</p>
      </td>
      <td className="hidden w-[180px] sm:table-cell">
        <h2>${coin.market_cap.toLocaleString()}</h2>
      </td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
}

export default CoinItem
