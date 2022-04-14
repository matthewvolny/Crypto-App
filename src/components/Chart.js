import React, { useContext, useState, useEffect, useRef } from "react";
import Context from "../context/context";
import { createChart } from "lightweight-charts";
import axios from "axios";
// import moment from "moment";
// const moment = require("moment-timezone");
import "./chart.css";
const moment = require("moment-timezone");

// moment().format();

export default function Chart() {
  const { selectedCoinData } = useContext(Context);
  const [coinChartData, setCoinChartData] = useState();
  const [viewFieldDuration, setViewFieldDuration] = useState("1");
  const [timeframeToFetch, setTimeframeToFetch] = useState("90");
  const isMounted = useRef(false);
  const isMountedTwo = useRef(false);

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
        // console.log(data);
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
          console.log(`data in "hr" format`);
          priceData.forEach((priceArray) => {
            // var d = new Date(priceArray[0]);
            // var myTimezone = "EST";
            // var myDatetimeFormat = "YYYY-MM-DD hh:mm:ss a z";
            // var myDatetimeString = moment(d)
            //   .tz(myTimezone)
            //   .format(myDatetimeFormat);

            // console.log(myDatetimeString);
            // var unix = moment.tz(priceArray[0], "America/New_York").unix();

            // const date = moment(priceArray[0]);
            // const newYork = moment.tz(priceArray[0] / 1000, "America/New_York");
            priceDataArray.push({
              //       const date = Math.floor(new Date().getTime() / 1000); //unix time stamp for the current date/time
              // console.log(`date: ${date}`);
              // // const yesterday = date - 86400;
              // // console.log(`yesterday: ${yesterday}`);
              // const date2 = Date.now() / 1000;
              // console.log(date2);
              // const str = new Date().toLocaleString("en-US", {
              //   timeZone: "EST",
              // });
              // console.log(str);
              // const newDate = date2.toLocaleString("en-US", {
              //   timeZone: "EST",
              // });

              // time: Math.floor(priceArray[0] / 1000).toLocaleString("en-US", {
              //   timeZone: "America/New_York",
              // }),

              time: Math.floor(priceArray[0] / 1000),
              value: priceArray[1].toFixed(4),
            });
          });
        }
        //formats "volume" data based on whether it is in "days" or "hrs"
        const volumeData = data.total_volumes;
        const volumeDataArray = [];
        if (/*duration === "365" ||*/ duration === "max") {
          volumeData.forEach((volumeArray) => {
            volumeDataArray.push({
              time: moment(volumeArray[0]).format("MM/DD/YYYY"),
              value: volumeArray[1].toFixed(4),
            });
          });
        } else {
          volumeData.forEach((volumeArray) => {
            volumeDataArray.push({
              time: Math.floor(volumeArray[0] / 1000),
              value: volumeArray[1].toFixed(4),
            });
          });
        }
        setCoinChartData({ prices: priceDataArray, volume: volumeDataArray });
      });
  };

  //(1)calls function making API request for chart data, when  component rendered, coin selected, or "timeframe" for particular coin is changed (with button click)
  useEffect(() => {
    //!can limit redundant calls here(i.e. repeated 30day calls)
    retrieveChartData(timeframeToFetch);
  }, [selectedCoinData, timeframeToFetch]);

  //(4a)renders the chart
  const renderChart = (coinChartData) => {
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
    volumeSeries.setData(coinChartData.volume);
    globalChart = chart;
    globalLineSeries = lineSeries;
    globalVolumeSeries = volumeSeries;
    // //!show values back to a given date
    //viewFieldDuration

    switch (viewFieldDuration) {
      case "1":
        // const date = Math.floor(new Date().getTime() / 1000); //unix time stamp for the current date/time
        // console.log(`date: ${date}`);
        // const yesterday = date - 86400;
        // console.log(`yesterday: ${yesterday}`);
        console.log("moment seq");
        const date2 = Date.now() / 1000; //unix time
        console.log(date2);

        console.log(moment.tz.zone("America/New_York").utcOffset(date2));

        const newDate2 = moment.tz(date2, "America/New_York");
        console.log(newDate2.format());

        const date3 = new Date(date2);
        console.log(moment.tz(date3, "America/New_York").format());
        console.log(moment.unix(date2));
        //!is this correct? I think it is
        console.log(moment.tz(moment.unix(date2), "America/New_York").format());

        // const str = new Date().toLocaleString("en-US", {
        //   timeZone: "EST",
        // });
        // console.log(str);
        // const newDate = date2.toLocaleString("en-US", {
        //   timeZone: "EST",
        // });
        chart.timeScale().setVisibleRange({
          from: "2022-03-12",
          // from: yesterday.setDate(date.getDate() - 1),
          to: date2,
          //! new Date().toLocaleDateString(),
          // new Date().toISOString().slice(0, 10),
          //or this // to: Date.now() / 1000;
        });
        break;
      case "7":
        // code block
        break;
      default:
      // code block
    }
  };

  //(4b)change chart data(two methods)
  const updateChartData = (newData) => {
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

  //(3)renders a new chart or updates the current chart with new data
  useEffect(() => {
    if (isMounted.current) {
      if (document.querySelector(".tv-lightweight-charts")) {
        updateChartData(coinChartData);
      } else {
        renderChart(coinChartData);
      }
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
              setTimeframeToFetch("max");
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
