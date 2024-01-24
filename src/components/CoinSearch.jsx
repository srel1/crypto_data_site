import React, {useEffect, useState} from 'react'
import CoinItem from '../components/CoinItem'
import { doc, onSnapshot} from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';

const CoinSearch = ({coins}) => {
  //console.log(coins)
  const [searchText, setSearchText] = useState('')
  const [userSavedCoins, setUserSavedCoins] = useState([]);
  const { user } = UserAuth();
  let arr = []

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setUserSavedCoins(doc.data()?.watchList);
    });
  }, [user?.email]);

  if(userSavedCoins){
    //console.log(userSavedCoins, "USER SAVED COINS")
    userSavedCoins.every((item) => arr.push(item.id) )
    //console.log(arr, 'FROM COIN SEARCH')
  }
  

  // if(!userSavedCoins){
  //   return (
  //   <div>
  //     <h2>Is loading</h2>
  //   </div>
  //   )
  // }

  return (
    <div>
      <div className="md:flex justify-between items-center">
        <h2 className="text-2xl font-bold text-center">Search Top Cryptocurrency</h2>
        <form>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className="mt-2 md:mt-0 w-full rounded-2xl shadow-xl bg-primary border border-input text-base py-2 px-3"
            type="text"
            placeholder="Search a coin"
          ></input>
        </form>
      </div>

      <table className="w-full border-collapse text-center text-base mt-6">
        <thead>
          <tr className='border-b'>
            <th></th>
            <th className='px-4'>#</th>
            <th className='text-left'>Coin</th>
            <th></th>
            <th>Price</th>
            <th>24h</th>
            <th className='hidden md:table-cell'>24h Volume</th>
            <th className='hidden sm:table-cell'>Mkt</th>
            <th>Last 7 days</th>
          </tr>
        </thead>

    <tbody>
      {coins
        .filter((value) => {
          if (searchText === "") {
            return value;
          } 
            return value.name.toLowerCase().includes(searchText.toLowerCase())
        })
        .map((coin) => (
          <CoinItem key={coin.id} coin={coin} alSaved={arr.includes(coin.id)}/>
        ))}
      </tbody>
      </table>
    </div>
  );
}

export default CoinSearch



