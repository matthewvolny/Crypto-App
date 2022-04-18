import React, { useEffect, useRef, useContext, useState } from "react";
//import Context from "../context/context";
import { createChart } from "lightweight-charts";
import CoinRow from "./CoinRow";

import "./coinlist.css";

export default function Coinlist(props) {
  // const { coinData } = useContext(Context);
  const [searchInput, setSearchInput] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <>
      <div className="coinlist-controls">
        {/* sorting buttons */}
        <div className="sorting-buttons">
          <div>Rank</div>
          <div>Volume</div>
          <div>Trending</div>
          <div>USD</div>
        </div>
        {/* table headers */}
        <div className="coinlist-header">
          <div>Rank</div>
          <div>Name</div>
          <div>Price</div>
          <div>24hr%</div>
          <div>7d%</div>
          <div>Last 7 Days</div>
        </div>
      </div>
      <div className="coinlist">
        {props.coinData?.map((coin, index) => {
          if (index < 50) {
            return <CoinRow coin={coin} />;
          }
        })}
      </div>
    </>
  );
}
