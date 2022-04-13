import React, { useContext, useState, useEffect, useRef } from "react";
import Context from "../context/context";
import { createChart } from "lightweight-charts";
import axios from "axios";
import moment from "moment";
import "./chart.css";
moment().format();

export default function Chart() {
  // const { coinChartData } = useContext(Context);
  const { selectedCoinData } = useContext(Context);
  const [coinChartData, setCoinChartData] = useState();
  const isMounted = useRef(false);

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
  } = selectedCoinData;
  const coinName = selectedCoinData.name;

  const retrieveChartData = (duration, momentFormat) => {
    const coinLowercase = coinName.charAt(0).toLowerCase() + coinName.slice(1);
    axios
      .get(
        //get single coin price
        // "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        //!has converted prices for coins
        //  'https://api.coingecko.com/api/v3/coins/bitcoin/tickers'
        //!has description of the coin
        //"https://api.coingecko.com/api/v3/coins/bitcoin"
        //!historical price data (for max duration) for a particular coin
        `https://api.coingecko.com/api/v3/coins/${coinLowercase}/market_chart?vs_currency=usd&days=${duration}`
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
        const priceData = data.prices;
        const priceDataArray = [];
        priceData.forEach((priceArray) => {
          priceDataArray.push({
            time: Math.floor(priceArray[0] / 1000),
            // time: moment(priceArray[0]).format(momentFormat),
            value: priceArray[1].toFixed(4),
          });
        });
        const volumeData = data.total_volumes;
        const volumeDataArray = [];
        volumeData.forEach((volumeArray) => {
          volumeDataArray.push({
            time: Math.floor(volumeArray[0] / 1000),
            // time: moment(volumeArray[0]).format(momentFormat),
            value: volumeArray[1].toFixed(4),
          });
        });
        setCoinChartData({ prices: priceDataArray, volume: volumeDataArray });
      });
  };

  useEffect(() => {
    retrieveChartData("1" /*, "MM/DD/YYYY"*/);
  }, []);

  // useEffect(() => {
  //   let chartElement = document.querySelector(".tv-lightweight-charts");
  //   if (chartElement) {
  //     console.log("here");
  //     chartElement.setAttribute("id", "chartElement");
  //   }
  // });

  useEffect(() => {
    if (isMounted.current) {
      const chart = createChart(document.querySelector(".chart"), {
        width: 500,
        height: 400,
        rightPriceScale: {
          visible: true,
        },
        grid: {
          vertLines: {
            visible: true,
          },
          horzLines: {
            visible: true,
          },
        },
        crosshair: {
          vertLine: {
            visible: true,
          },
          horzLine: {
            visible: true,
          },
        },
        layout: {
          backgroundColor: "white",
        },
        // timeScale: {
        //   visible: true,
        //   /*timeVisible: true secondsVisible: true,*/
        // },

        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
        // borderColor: "green",
        // timeVisible: false,
        // priceScaleMode: percentChange,
      });
      //fits timescale to the content
      // chart.timeScale().fitContent();

      const lineSeries = chart
        .addLineSeries
        //used to set y-axis scale (not quite sure exactly how it works)
        //   {
        //   autoscaleInfoProvider: () => ({
        //     priceRange: {
        //       minValue: 0,
        //       maxValue: 100,
        //     },
        //   }),
        // }
        ();
      lineSeries.applyOptions({
        color: "red",
        lineWidth: 4,
        //crosshair dot
        crosshairMarkerVisible: true,
        //both of these are similar
        lastValueVisible: true,
        priceLineVisible: true,
        //can make the series disapper (labels remain)
        visible: true,
        //
      });
      // const customFormatter = (time, tickMarkType, locale) => {
      //   // tickMarkType: "year";
      // };
      lineSeries.setData(coinChartData.prices);
      //   window.addEventListener("resize", handleResize);

      const volumeSeries = chart.addHistogramSeries({
        color: "#26a69a",
        priceFormat: {
          type: "volume",
        },
        priceScaleId: "",
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });
      //volume series
      volumeSeries.setData(coinChartData.volume);
    } else {
      isMounted.current = true;
    }
  }, [coinChartData]);

  return (
    <>
      <div className="coin-details-flex">
        <img className="icon" src={image} alt="icon" />
        <div>{name}</div>
        <div>{symbol}</div>
        <div>{rank}</div>
        <div>${price}</div>
        <div>{percentChange24hr}%</div>
        <div>{marketCap}</div>
        <div>{volume24hr}</div>
      </div>
      <div className="chart-with-controls-container">
        <div className="chart-controls">
          <div
            value="day"
            onClick={() => {
              retrieveChartData("1", "HH:mm:ss");
            }}
          >
            Day
          </div>
          <div
            value="week"
            onClick={() => {
              retrieveChartData("7", "MM/DD/YYYY");
            }}
          >
            Week
          </div>
          <div
            value="month"
            onClick={() => {
              retrieveChartData("30", "MM/DD/YYYY");
            }}
          >
            Month
          </div>
          <div
            value="year"
            onClick={() => {
              retrieveChartData("365", "MM/DD/YYYY");
            }}
          >
            Year
          </div>
          <div
            value="all"
            onClick={() => {
              retrieveChartData("max", "MM/DD/YYYY");
            }}
          >
            All
          </div>
        </div>
        <div className="chart"></div>
      </div>
    </>
  );
}
