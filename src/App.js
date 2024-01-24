import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import { Route, Routes} from 'react-router-dom';

import axios from 'axios'
import Home from './routes/Home';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Account from './routes/Account';
import CoinPage from "./routes/CoinPage";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [coins, setCoins] = useState([]);
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true'


  useEffect(() => {
    axios.get(url).then((response) => {
        setCoins(response.data);
        //console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url])

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home coins={coins} />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/coin/:coinId" element={<CoinPage />}>
            <Route path=":coinId" />
          </Route>
        </Routes>
        <Footer />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;