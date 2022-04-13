import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from "./context/context";
import Coinlist from "./components/Coinlist";
import Chart from "./components/Chart";
import axios from "axios";
import "./App.css";

function App() {
  const [ethereumPrice, setEthereumPrice] = useState();
  const [lastPrice, setLastPrice] = useState();
  const [greenOrRed, setGreenOrRed] = useState("black");
  const [coinData, setCoinData] = useState();
  const [selectedCoinData, setSelectedCoinData] = useState();
  const [coinChartData, setCoinChartData] = useState();

  useEffect(() => {
    if (lastPrice <= ethereumPrice) {
      setGreenOrRed("green");
      setLastPrice(ethereumPrice);
    } else {
      setGreenOrRed("red");
      setLastPrice(ethereumPrice);
    }
  }, [ethereumPrice]);

  //stream price of this particular coin
  // let ws = new WebSocket("wss://stream.binance.com:9443/ws/btceur@trade");
  // ws.onmessage = (event) => {
  //   let stockObject = JSON.parse(event.data);
  //   console.log(stockObject.p);
  //   //convert string price to number(round to two decimal places)
  //   const shortenedPrice = parseFloat(stockObject.p).toFixed(2);
  //   setEthereumPrice(shortenedPrice);
  // };

  //setting up multiple streams at once
  // let ws = new WebSocket(
  //   "wss://stream.binance.com:9443/ws/btceur@trade/etheur@trade"
  // );
  // ws.onmessage = (event) => {
  //   let stockObject = JSON.parse(event.data);
  //   console.log(stockObject);
  //   //convert string price to number(round to two decimal places)
  //   // const shortenedPrice = parseFloat(stockObject.p).toFixed(2);
  //   // setEthereumPrice(shortenedPrice);
  // };

  //get data stream for all tickers)
  // let ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");
  // ws.onmessage = (event) => {
  //   let stockObject = JSON.parse(event.data);
  //   console.log(stockObject);
  //   //convert string price to number(round to two decimal places)
  //   // const shortenedPrice = parseFloat(stockObject.p).toFixed(2);
  //   // setEthereumPrice(shortenedPrice);
  // };

  //gets all coin symbols on binance
  // useEffect(() => {
  //   axios
  //     // .get("https://api.binance.us/api/v3/ticker/price?symbol=LTCBTC")
  //     .get("https://api.binance.us/api/v3/exchangeInfo")
  //     .then((response) => {
  //       const data = response.data;
  //       console.log(data);
  //     });
  // }, []);

  //more binance endpoints
  // useEffect(() => {
  //   axios
  //     //get price in currency for a particular coin
  //     //.get("https://api.binance.us/api/v3/ticker/price?symbol=LTCUSD")
  //     //current price for all coins listed (would have to sort to get all listed coins in USD)
  //     // .get("https://api.binance.us/api/v3/ticker/price")
  //     .then((response) => {
  //       const data = response.data;
  //       console.log(data);
  //     });
  // }, []);

  //!coingecko

  //only keep every 8th value from sparkline data, and round to 4 decimal places
  //!check to make sure the "first" and "last" values are in the shortened array - need for accurate coloring
  const roundSparklineData = (data) => {
    let dataArray = data.price;
    // console.log(dataArray);
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

  useEffect(() => {
    axios
      .get(
        //get single coin price
        // "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        //!key endpoint, lists all coins by market cap with change for various periods of time, also shows sparklines for 7 days (axis-less data for graph)
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h%2C7d"
        //!has converted prices for coins
        //  'https://api.coingecko.com/api/v3/coins/bitcoin/tickers'
        //!has description of the coin
        //"https://api.coingecko.com/api/v3/coins/bitcoin"
        //!historical price data (for max duration) for a particular coin
        //"https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max"
        //list all coins (tens of thousands)
        // "https://api.coingecko.com/api/v3/coins/list"
        //get market cap for a smattering of coins (not sure if all)
        // "https://api.coingecko.com/api/v3/global"
        //have a search bar for individual coins (could show only if it in the list of coins I am displaying), has market cap rank and images links
        // "https://api.coingecko.com/api/v3/search?query=bitcoin"
        //list of supported and currencies (not exactly sure what this means)
        // "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
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
            // sparkline: coin.sparkline_in_7d,
            sparkline: roundSparklineData(coin.sparkline_in_7d),
          });
        });
        console.log(coinDataArray);
        setCoinData(coinDataArray);
      });
  }, []);

  return (
    <Context.Provider
      value={{
        selectedCoinData,
        setSelectedCoinData,
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
          <div>Hello</div>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
