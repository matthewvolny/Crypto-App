import React, { useState, useRef, useContext, useEffect } from "react";
import Context from "../context/context";
// import { createChart } from "lightweight-charts";
import { NavLink } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import axios from "axios";
import "./coinrow.css";

export default function CoinRow(props) {
  const [sparklineColor, setSparklineColor] = useState();
  const { setSelectedCoinData, setCoinChartData } = useContext(Context);
  //const isMounted = useRef(false);
  // console.log(props);
  // const { name, price, percentChange, data } = props.coin;
  const {
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

  return (
    <div className="coin-row">
      <div>{rank}</div>
      <div>
        <img src={image} alt="crypto-icon" className="icon"></img>
      </div>
      <NavLink
        to={`/currencies/${name}`}
        key={rank}
        onClick={() => {
          setSelectedCoinData(props.coin);
          // setActionClicked("day");
          // retrieveDetailedChartData(name);
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
