import React, { useContext, useState, useEffect, useRef } from "react";
import Context from "../context/context";
import { createChart } from "lightweight-charts";
import axios from "axios";
import moment from "moment";
// const moment = require("moment-timezone");
import "./chart.css";
moment().format();

export default function Chart() {
  const { selectedCoinData } = useContext(Context);
  const [coinChartData, setCoinChartData] = useState();
  //!set viewfield duration back to 1
  const [viewFieldDuration, setViewFieldDuration] = useState("1");
  const [timeframeToFetch, setTimeframeToFetch] = useState("90");
  const isMounted = useRef(false);
  const isMountedTwo = useRef(false);
  const prevTimeFrameToFetchRef = useRef("90");

  //global variables
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
  let globalChart;
  let globalLineSeries;
  let globalVolumeSeries;

  //(2)retrieves price/volume data for for varying periods of time
  const retrieveChartData = (duration) => {
    const coinLowercase = coinName.charAt(0).toLowerCase() + coinName.slice(1);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinLowercase}/market_chart?vs_currency=usd&days=${duration}`
      )
      .then((response) => {
        const data = response.data;
        console.log("fetched data");
        console.log(data);
        //formats "price" data based on whether it is in "days" or "hrs"
        const priceData = data.prices;
        const priceDataArray = [];
        if (/*duration === "365" ||*/ duration === "max") {
          console.log(`data in "day" format`);
          priceData.forEach((priceArray) => {
            priceDataArray.push({
              time: moment(priceArray[0]).format("MM/DD/YYYY"),
              value: priceArray[1].toFixed(4),
            });
          });
        } else {
          // console.log(`price in "hr" format`);
          priceData.forEach((priceArray) => {
            const unixDate = Math.floor(priceArray[0] / 1000);
            const unixDateTZAdjusted = unixDate - 14400;
            priceDataArray.push({
              time: unixDateTZAdjusted,
              value: priceArray[1].toFixed(4),
            });
          });
        }
        //formats "volume" data based on whether it is in "days" or "hrs"
        const volumeData = data.total_volumes;
        const volumeDataArray = [];
        if (/*duration === "365" ||*/ duration === "max") {
          console.log(`data in "day" format`);
          volumeData.forEach((volumeArray) => {
            volumeDataArray.push({
              time: moment(volumeArray[0]).format("MM/DD/YYYY"),
              value: volumeArray[1].toFixed(4),
            });
          });
        } else {
          // console.log(`volume in "hr" format`);
          volumeData.forEach((volumeArray) => {
            const unixDate = Math.floor(volumeArray[0] / 1000);
            const unixDateTZAdjusted = unixDate - 14400;
            volumeDataArray.push({
              time: unixDateTZAdjusted,
              value: volumeArray[1].toFixed(4),
            });
          });
        }
        setCoinChartData({ prices: priceDataArray, volume: volumeDataArray });
      });
  };

  //(1)calls function making API request for chart data, when  component rendered, coin selected, or "timeframe" for particular coin is changed (with button click)

  //const isMounted = useRef(false);

  //  if (isMounted.current) {
  //     if (document.querySelector(".tv-lightweight-charts")) {
  //       updateChartData(coinChartData);
  //     } else {
  //       renderChart(coinChartData);
  //     }
  //   } else {
  //     isMounted.current = true;
  //   }

  useEffect(() => {
    console.log("number 1");
    prevTimeFrameToFetchRef.current = timeframeToFetch;
    //!can limit redundant calls here(i.e. repeated 30day calls)
    retrieveChartData(timeframeToFetch);
  }, [selectedCoinData]);

  //(4a)renders the chart
  const renderChart = (coinChartData) => {
    console.log(coinChartData);
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
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
      // localization: {
      //   timeFormatter: (businessDayOrTimestamp) => {
      //     if (chart.isBusinessDay(businessDayOrTimestamp)) {
      //       return (
      //         "bd=" +
      //         businessDayOrTimestamp.day +
      //         "-" +
      //         businessDayOrTimestamp.month +
      //         "-" +
      //         businessDayOrTimestamp.year
      //       );
      //     }

      //     return "ts=" + businessDayOrTimestamp;
      //   },
      // },
    });
    const lineSeries = chart.addLineSeries();
    lineSeries.applyOptions({
      color: "red",
      lineWidth: 4,
      crosshairMarkerVisible: true,
      lastValueVisible: true,
      priceLineVisible: true,
      visible: true,
    });
    // console.log(coinChartData.prices);
    lineSeries.setData(coinChartData.prices);

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
    // console.log(coinChartData.volume);
    volumeSeries.setData(coinChartData.volume);

    // //!show values back to a given date
    const todaysDate = new Date();
    const todaysDateUnixTime = new Date(todaysDate).getTime() / 1000;
    // const todaysFormattedUnixDate = Math.floor(todaysDate / 1000);
    switch (viewFieldDuration) {
      case "1":
        console.log("case 1");
        const twentyFourHoursPriorDate = todaysDateUnixTime - 86400;
        //!alternatively can show beginning of actual day (though this is more relevant for stocks, not crypto)
        // todaysDate.setUTCHours(0, 0, 0, 0);
        // const beginningOfDay = todaysDate.toUTCString();
        // const beginningOfDayUnixTime =
        //   new Date(beginningOfDay).getTime() / 1000;
        chart.timeScale().setVisibleRange({
          from: twentyFourHoursPriorDate,
          to: todaysDateUnixTime,
        });
        break;
      case "7":
        console.log("case 7");
        const sevenDaysPriorDate = todaysDateUnixTime - 604800;
        chart.timeScale().setVisibleRange({
          from: sevenDaysPriorDate,
          to: todaysDateUnixTime,
        });
        break;
      case "30":
        console.log("case 30");
        const oneMonthPriorDate = todaysDateUnixTime - 2592000;
        chart.timeScale().setVisibleRange({
          from: oneMonthPriorDate,
          to: todaysDateUnixTime,
        });
        break;
      case "365":
        console.log("case 365");
        // debugger;
        const oneYearPriorDate = todaysDateUnixTime - 3.154e7;
        chart.timeScale().setVisibleRange({
          from: oneYearPriorDate,
          to: todaysDateUnixTime,
        });
        break;
      case "max":
        console.log("case max");
        chart.timeScale().fitContent();
        break;
      default:
      // code block
    }
    //global variables used to update the chart (not currently being used)
    globalChart = chart;
    globalLineSeries = lineSeries;
    globalVolumeSeries = volumeSeries;
  };

  //(4b)change chart data(two methods)
  const updateChartData = (newData) => {
    console.log("updateChart");
    console.log(newData);
    //!two approaches to replacing data in chart
    //!(1)-delete chart
    const previousChart = document.querySelector(".tv-lightweight-charts");
    previousChart.remove();
    renderChart(newData);

    // //!(2)-delete series (presumably faster(?), not sure)
    // globalChart.removeSeries(globalLineSeries);
    // const newLineSeries = globalChart.addLineSeries();
    // newLineSeries.applyOptions({
    //   color: "red",
    //   lineWidth: 4,
    //   crosshairMarkerVisible: true,
    //   //!may or may not keep these two on
    //   lastValueVisible: true,
    //   priceLineVisible: true,
    // });
    // newLineSeries.setData(newData);

    // //!very usefull, keeps all data in frame
    // // globalChart.timeScale().fitContent();

    // //!scrolls screen 5 days to the left (with or without animation) - may have limited utility, as moves right side as well
    // //globalChart.timeScale().scrollToPosition(-5, true);
    // //!show values back to a given date
    // globalChart.timeScale().setVisibleRange({
    //   //!can programmatically get various times in the past(1yr ago,  max, etc.) from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    //   from: "2018-12-17",
    //   //!most recent date (may be able to set this a little in the future to get more space)
    //   to: new Date().toISOString().slice(0, 10),
    //   //or this // to: Date.now() / 1000;
    // });
  };

  //(3)renders a new chart or updates the current chart with new data (* this is (1) if chart is already rendered, as it updates chart on button click)
  useEffect(() => {
    if (isMounted.current) {
      if (document.querySelector(".tv-lightweight-charts")) {
        //!if user has clicked a different timeframe to fetch (i.e. 1year, or max)
        if (prevTimeFrameToFetchRef.current !== timeframeToFetch) {
          retrieveChartData(timeframeToFetch);
          prevTimeFrameToFetchRef.current = timeframeToFetch;
        } else {
          console.log("updateChartData");
          //deletes the chart before rendering
          updateChartData(coinChartData);
        }
      } else {
        renderChart(coinChartData);
      }
    } else {
      isMounted.current = true;
    }
  }, [coinChartData, viewFieldDuration]);

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
              setViewFieldDuration("1");
              setTimeframeToFetch("90");
            }}
          >
            Day
          </div>
          <div
            value="week"
            onClick={() => {
              setViewFieldDuration("7");
              setTimeframeToFetch("90");
            }}
          >
            Week
          </div>
          <div
            value="month"
            onClick={() => {
              setViewFieldDuration("30");
              setTimeframeToFetch("90");
            }}
          >
            Month
          </div>
          <div
            value="year"
            onClick={() => {
              setViewFieldDuration("365");
              setTimeframeToFetch("max");
            }}
          >
            Year
          </div>
          <div
            value="all"
            onClick={() => {
              setViewFieldDuration("max");
              setTimeframeToFetch("max");
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
