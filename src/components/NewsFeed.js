import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import "./newsFeed.css";

export default function NewsFeed() {
  const [articles, setArticles] = useState();

  //const currentDate = moment().format("YYYY-MM-DD");
  const threeDaysAgo = moment().subtract(3, "d").format("YYYY-MM-DD");

  //function calling api and storing article data in state
  const fetchArticles = () => {
    axios
      .get(
        //list all coins (tens of thousands)
        `https://newsapi.org/v2/everything?q=crypto&from=${threeDaysAgo}&language=en&apiKey=69563e91b17745efad0051f4c02a3f94`
      )
      .then((response) => {
        const data = response.data;
        // console.log(data);

        // const newsArticleArray = [];
        // newsArticles.forEach((article) => {
        //   newsArticleArray.push({
        //     author: article.author,
        //     content: article.content, //maybe not needed
        //     description: article.author,
        //     publishedAt:: article.publishedAt,
        //     symbol: coin.symbol,

        //     price: coin.current_price.toLocaleString("en-US"),
        //     percentChange24hr:
        //       coin.price_change_percentage_24h_in_currency.toFixed(2),
        //     percentChange7d:
        //       coin.price_change_percentage_7d_in_currency.toFixed(2),
        //     marketCap: coin.market_cap.toLocaleString("en-US"),
        //     volume24hr: coin.total_volume.toLocaleString("en-US"),
        //     // sparkline: coin.sparkline_in_7d,
        //     sparkline: roundSparklineData(coin.sparkline_in_7d),
        //   });

        setArticles(data.articles);
      });
  };

  //fetch articles when component mounts
  // useEffect(() => {
  //   fetchArticles();
  // }, []);

  //maps articles stored in state, returning article element
  const articlesList = articles?.map((article) => {
    return (
      <div className="article" key={Math.floor(Math.random() * 10000)}>
        <img src={article.urlToImage} alt="article"></img>
        <div className="article-title">{article.title}</div>
        <div>{article.description}</div>
        <div>{article.source.name}</div>
        <div>{article.publishedAt}</div>
        <a href={article.url}>Link</a>
      </div>
    );
  });

  return <>{articlesList}</>;
}
