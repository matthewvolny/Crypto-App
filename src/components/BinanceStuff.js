import React, { useEffect, useState } from "react";

export default function BinanceStuff() {
  const [ethereumPrice, setEthereumPrice] = useState();
  const [lastPrice, setLastPrice] = useState();
  const [greenOrRed, setGreenOrRed] = useState("black");

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

  //!not binance, but may be needed later
  useEffect(() => {
    axios
      .get(
        //get single coin price
        // "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        //!key endpoint, lists all coins by market cap with change for various periods of time, also shows sparklines for 7 days (axis-less data for graph)
        //
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h%2C7d"
        //!has converted prices for coins
        //  'https://api.coingecko.com/api/v3/coins/bitcoin/tickers'
        //!has description of the coin
        //"https://api.coingecko.com/api/v3/coins/bitcoin"
        //!historical price data (for max duration) for a particular coin
        //"https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max"
        //list all coins (tens of thousands)
        //"https://api.coingecko.com/api/v3/coins/list"
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

  return <div>BinanceStuff</div>;
}
