import React, { useState, useRef, useContext, useEffect } from "react";
import Context from "../context/context";
// import { createChart } from "lightweight-charts";
import { NavLink } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import axios from "axios";
import "./coinrow.css";

export default function CoinRow(props) {
  const [sparklineColor, setSparklineColor] = useState();
  const { selectedCoinData, setSelectedCoinData, setCoinChartData } =
    useContext(Context);
  const [selectedCoinDataWithDescription, setSelectedCoinDataWithDescription] =
    useState();
  //const isMounted = useRef(false);
  // console.log(props);
  // const { name, price, percentChange, data } = props.coin;
  const {
    id,
    rank,
    image,
    name,
    symbol,
    price,
    percentChange24hr,
    percentChange7d,
    marketCap,
    volume24hr,
    sparkline,
  } = props.coin;

  //colors sparkline chart based on 7d % change
  useEffect(() => {
    if (percentChange7d > 0) {
      setSparklineColor("green");
    } else {
      setSparklineColor("red");
    }
  });

  //adds "description" to coin selectedCoinInfo
  const fetchCoinDescription = (coin) => {
    console.log("in fetchCoinDescription");
    console.log(coin);
    console.log(coin.id);
    let selectedCoinInfo = coin;
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coin.id}`)
      .then((response) => {
        const data = response.data;
        // console.log(data);
        // console.log(data.description.en);
        selectedCoinInfo.description = data.description.en;
        // console.log("selectedCoinInfo");
        // console.log(selectedCoinInfo);
        setSelectedCoinDataWithDescription(selectedCoinInfo);
      });
  };

  return (
    <div className="coin-row">
      <div>{rank}</div>
      <div>
        <img src={image} alt="crypto-icon" className="icon"></img>
      </div>
      <NavLink
        to={`/currencies/${name}`}
        key={rank}
        onMouseEnter={() => {
          fetchCoinDescription(props.coin);
        }}
        onClick={() => {
          setSelectedCoinData(selectedCoinDataWithDescription);
        }}
      >
        {name}
      </NavLink>
      <div>{symbol}</div>
      <div>${price}</div>
      <div className="percent-change">{percentChange24hr}</div>
      <div className="percent-change">{percentChange7d}</div>
      {/* <div>${marketCap}</div>
      <div>${volume24hr}</div> */}
      {/* <div className="chart"></div> */}
      <Sparklines
        // className="sparkline-container"
        data={sparkline}
        // width={100}
        // height={20}
        // margin={5}
      >
        <SparklinesLine
          style={{ strokeWidth: 3, stroke: sparklineColor, fill: "none" }}
        />
      </Sparklines>
    </div>
  );
}
