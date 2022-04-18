import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from "./context/context";
import Coinlist from "./components/Coinlist";
import Chart from "./components/Chart";
import Login from "./components/Login";
import SearchBar from "./components/SearchBar";
import NewsFeed from "./components/NewsFeed";
import axios from "axios";
import "./App.css";

function App() {
  const [coinData, setCoinData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState();
  // const [allCoinIds, setAllCoinIds] = useState();
  // const [additionalCoinIdInfo, setAdditionalCoinIdInfo] = useState([]);

  //(3)shortens sparkline data array and rounds to four places
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

  //(2)initial api call retrieves list data for a subset of coins
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
            id: coin.id,
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
        // console.log(coinDataArray);
        setCoinData(coinDataArray);
      });
  };

  //()asynchronously fetch larger coin set after rendering initial set
  // const fetchLargerCoinSet = async () => {
  //   await axios
  //     .get(
  //       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h%2C7d"
  //     )
  //     .then((response) => {
  //       const data = response.data;
  //       // console.log(data);
  //       const coinDataArray = [];
  //       data.forEach((coin) => {
  //         coinDataArray.push({
  //           rank: coin.market_cap_rank,
  //           image: coin.image,
  //           name: coin.name,
  //           symbol: coin.symbol,
  //           price: coin.current_price.toLocaleString("en-US"),
  //           percentChange24hr:
  //             coin.price_change_percentage_24h_in_currency.toFixed(2),
  //           percentChange7d:
  //             coin.price_change_percentage_7d_in_currency.toFixed(2),
  //           marketCap: coin.market_cap.toLocaleString("en-US"),
  //           volume24hr: coin.total_volume.toLocaleString("en-US"),
  //           sparkline: roundSparklineData(coin.sparkline_in_7d),
  //         });
  //       });
  //       console.log(coinDataArray);
  //       setCoinData(coinDataArray);
  //     });
  // };

  //

  //(4)asynchronously fetch larger coin set after rendering initial set
  // const fetchAllCoins = async (initialPage, stopIndex) => {
  //   const coinDataArray = [...additionalCoinIdInfo];
  //   for (let i = initialPage; i <= stopIndex; i++) {
  //     await axios
  //       .get(
  //         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`
  //       )
  //       .then((response) => {
  //         const data = response.data;
  //         data.forEach((coin) => {
  //           if (coin.rank !== null) {
  //             coinDataArray.push({
  //               rank: coin.market_cap_rank,
  //               image: coin.image,
  //               name: coin.name,
  //               symbol: coin.symbol,
  //             });
  //           }
  //         });
  //       });
  //   }
  //   setAdditionalCoinIdInfo(coinDataArray);
  //   console.log(additionalCoinIdInfo);
  // };

  const fetchAllRankedCoins = (initialPage, stopIndex) => {
    console.log("in all ranked coins");
    const coinDataArray = [...coinData];
    for (let i = initialPage; i <= stopIndex; i++) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}&sparkline=true&price_change_percentage=24h%2C7d`
        )
        .then((response) => {
          const data = response.data;
          // console.log(data);
          data.forEach((coin) => {
            //!may want to add sorting on coin rank
            // if (coin.rank) {
            coinDataArray.push({
              id: coin.id,
              rank: coin.market_cap_rank,
              image: coin.image,
              name: coin.name,
              symbol: coin.symbol,
              price: coin.current_price?.toLocaleString("en-US"),
              percentChange24hr:
                coin.price_change_percentage_24h_in_currency?.toFixed(2),
              percentChange7d:
                coin.price_change_percentage_7d_in_currency?.toFixed(2),
              marketCap: coin.market_cap?.toLocaleString("en-US"),
              volume24hr: coin.total_volume?.toLocaleString("en-US"),
              sparkline: roundSparklineData(coin.sparkline_in_7d),
            });
            // }
          });
          // console.log(coinDataArray);
          const sortedCoinDataArray = coinDataArray.sort((a, b) => {
            return a.rank - b.rank;
          });
          console.log("sorted coin data");
          console.log(sortedCoinDataArray); //coin data sorted
          setCoinData(sortedCoinDataArray); //!not sorted in state (probably missing an update)
        });
    }
    // console.log(`this is the final "coinData"`);
    // console.log(coinDataArray);
    // setCoinData(coinDataArray);
  };

  //()get ids for all coins listed and adds them to "coinData" (an array stored in state)
  // const getIdsAfterPageLoad = /*async*/ () => {
  //   /*await*/ axios
  //     .get(
  //       //list all coins (tens of thousands)
  //       "https://api.coingecko.com/api/v3/coins/list"
  //     )
  //     .then((response) => {
  //       const allCoinsIdArray = response.data;
  //       // console.log(allCoinsIdArray);
  //       // console.log(coinData);
  //       //!updating state by setting "equal", not by creating a copy and pushing
  //       const coinDataCopy = coinData;
  //       for (let i = 0; i < coinDataCopy.length; i++) {
  //         for (let j = 0; j < allCoinsIdArray.length; j++) {
  //           if (coinDataCopy[i].name === allCoinsIdArray[j].name) {
  //             coinDataCopy[i].id = allCoinsIdArray[j].id;
  //           }
  //         }
  //       }
  //       //store all ids as a searchable list (for search bar dropdown)
  //       // console.log("allCoinsIdArray");
  //       // console.log(allCoinsIdArray);
  //       setAllCoinIds(allCoinsIdArray);
  //     });
  // };

  //(1) fetch initial coins to list
  useEffect(() => {
    fetchInitialCoinSet();
    fetchAllRankedCoins(1, 15);
    //fetchLargerCoinSet(); //asynchronous
  }, []);

  useEffect(() => {
    // console.log(coinData);
  }, [coinData]);

  //()get "correct" ids for all coins listed
  // useEffect(() => {
  //   // getIdsAfterPageLoad();
  //   //
  //   //fetch detailed info for all ranked coins
  //   //fetchAllRankedCoins(1, 15);
  //   console.log(coinData);
  // }, [coinData]);

  // useEffect(() => {
  //   console.log("additionalCoinIdInfo");
  //   console.log(additionalCoinIdInfo);
  // }, [additionalCoinIdInfo]);

  return (
    <Context.Provider
      value={{
        selectedCoinData,
        setSelectedCoinData,
        coinData,
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
        <BrowserRouter>
          <div className="middle-flex">
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
          </div>
          <div className="right-flex">
            <Login />
            <SearchBar />
            <NewsFeed />
          </div>
        </BrowserRouter>
      </div>
    </Context.Provider>
  );
}

export default App;
