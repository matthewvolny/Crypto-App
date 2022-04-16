import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from "./context/context";
import Coinlist from "./components/Coinlist";
import Chart from "./components/Chart";
import NewsFeed from "./components/NewsFeed";
import axios from "axios";
import "./App.css";

function App() {
  const [coinData, setCoinData] = useState();
  const [selectedCoinData, setSelectedCoinData] = useState();
  // const [coinChartData, setCoinChartData] = useState();
  // const [actionClicked, setActionClicked] = useState();

  //(2)shortens sparkline data array and rounds to four places
  //!check to make sure the "first" and "last" values are in the shortened array - need for accurate coloring
  const roundSparklineData = (data) => {
    let dataArray = data.price;
    //console.log(dataArray);
    for (let i = dataArray.length - 1; i >= 0; i--) {
      if (i % 8 !== 0) {
        dataArray.splice(i, 1);
      } else {
        // console.log(dataArray[i]);
        dataArray[i].toFixed(4); //!not rounding
      }
    }
    // console.log(dataArray);
    return dataArray;
  };

  //(1)initial api call retrieves list data for a subset of coins
  const fetchInitialCoinSet = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h%2C7d"
      )
      .then((response) => {
        const data = response.data;
        // console.log(data);
        const coinDataArray = [];
        data.forEach((coin) => {
          coinDataArray.push({
            rank: coin.market_cap_rank,
            image: coin.image,
            name: coin.name,
            symbol: coin.symbol,
            price: coin.current_price.toLocaleString("en-US"),
            percentChange24hr:
              coin.price_change_percentage_24h_in_currency.toFixed(2),
            percentChange7d:
              coin.price_change_percentage_7d_in_currency.toFixed(2),
            marketCap: coin.market_cap.toLocaleString("en-US"), //!not displayed initially
            volume24hr: coin.total_volume.toLocaleString("en-US"), //!not displayed initially
            sparkline: roundSparklineData(coin.sparkline_in_7d),
          });
        });
        console.log(coinDataArray);
        setCoinData(coinDataArray);
      });
  };

  //(3)asynchronously fetch larger coin set after rendering initial set
  const fetchLargerCoinSet = async () => {
    await axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h%2C7d"
      )
      .then((response) => {
        const data = response.data;
        // console.log(data);
        const coinDataArray = [];
        data.forEach((coin) => {
          coinDataArray.push({
            rank: coin.market_cap_rank,
            image: coin.image,
            name: coin.name,
            symbol: coin.symbol,
            price: coin.current_price.toLocaleString("en-US"),
            percentChange24hr:
              coin.price_change_percentage_24h_in_currency.toFixed(2),
            percentChange7d:
              coin.price_change_percentage_7d_in_currency.toFixed(2),
            marketCap: coin.market_cap.toLocaleString("en-US"),
            volume24hr: coin.total_volume.toLocaleString("en-US"),
            sparkline: roundSparklineData(coin.sparkline_in_7d),
          });
        });
        console.log(coinDataArray);
        setCoinData(coinDataArray);
      });
  };

  //(4)get ids for all coins listed and adds them to "coinData" (an array stored in state)
  const getIdsAfterPageLoad = async () => {
    await axios
      .get(
        //list all coins (tens of thousands)
        "https://api.coingecko.com/api/v3/coins/list"
      )
      .then((response) => {
        const allCoinsIdArray = response.data;
        // console.log(allCoinsIdArray);
        // console.log(coinData);
        //!updating state by setting "equal", not by creating a copy and pushing
        const coinDataCopy = coinData;
        for (let i = 0; i < coinDataCopy.length; i++) {
          for (let j = 0; j < allCoinsIdArray.length; j++) {
            if (coinDataCopy[i].name === allCoinsIdArray[j].name) {
              coinDataCopy[i].id = allCoinsIdArray[j].id;
            }
          }
        }
        // console.log(coinDataCopy);
        //!creates an infinite loop
        //setCoinData(coinDataCopy);//!currently creates an infinite loop
      });
  };

  //

  useEffect(() => {
    // fetchInitialCoinSet();
    // fetchLargerCoinSet(); //asynchronous
  }, []);

  //get "correct" ids for all coins listed
  useEffect(() => {
    getIdsAfterPageLoad();
    // fetchLargerCoinSet();//sets off an infinite loop
  }, [coinData]);

  return (
    <Context.Provider
      value={{
        selectedCoinData,
        setSelectedCoinData,
        // actionClicked,
        // setActionClicked,
        // coinChartData,
        // setCoinChartData,
      }}
    >
      <div className="container">
        <div className="sidebar-flex">
          <div>Logo</div>
          <div>Matthew</div>
          <div>Home</div>
          <div>Wallet</div>
          <div>Trading Ideas</div>
          <div>Settings</div>
          <div>Log Out</div>
        </div>
        <div className="middle-flex">
          <BrowserRouter>
            <div className="chart-container">
              <Routes>
                {/* <Route path="/" element={<SearchBar />} /> */}
                <Route path="currencies/:id" element={<Chart />} />
                {/* <Route path="/" element={<Coinlist coinData={coinData} />} /> */}
              </Routes>
            </div>
            <div className="coinlist-container">
              <Coinlist coinData={coinData} />
            </div>
          </BrowserRouter>
        </div>
        <div className="right-flex">
          <NewsFeed />
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
