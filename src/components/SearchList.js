import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Context from "../context/context";
import "./searchList.css";

export default function SearchList({ value, list, clearSearchBar }) {
  // console.log(value, list);
  const { coinData, setSelectedCoinData } = useContext(Context);
  const [filteredListLength, setFilteredListLength] = useState(0);
  const [allResultsVisibility, setAllResultsVisibility] = useState(false);

  const Dropdown = () => {
    //if user enters value in search bar
    if (value) {
      console.log(list);

      //checks input value against list of coins for matches
      const filteredList = coinData.filter((item) => {
        return item.name
          .toString()
          .toLowerCase()
          .startsWith(value.toLowerCase());
      });
      console.log("filteredList");
      console.log(filteredList);
      setFilteredListLength(filteredList.length - 4);
      //   setFilteredCoinList(filteredList);
      if (filteredList.length === 0) {
        return (
          <div>
            <div>No results for '{value}'</div>
            <div>We couldn't find anything matching your search.</div>
            <div>Try again with a different term.</div>
          </div>
        );
      } else {
        console.log("filtered list found");
        return filteredList.map((item, index) => {
          if (allResultsVisibility) {
            return (
              <div className="search-item">
                <NavLink
                  onClick={() => {
                    setSelectedCoinData(item);
                    clearSearchBar();
                    setAllResultsVisibility(false);
                  }}
                  to={`/currencies/${item.name}`}
                  key={item.id}
                >
                  <div>
                    <img className="icon" alt="search-icon" src={item.image} />
                  </div>
                  <div>{item.name}</div>
                  <div>{item.symbol.toUpperCase()}</div>
                  <div>#{item.rank}</div>
                </NavLink>
              </div>
            );
          } else {
            if (index < 4) {
              return (
                <div className="search-item">
                  <NavLink
                    onClick={() => {
                      setSelectedCoinData(item);
                      clearSearchBar();
                      setAllResultsVisibility(false);
                    }}
                    to={`/currencies/${item.name}`}
                    key={item.id}
                  >
                    <div>
                      <img
                        className="icon"
                        alt="search-icon"
                        src={item.image}
                      />
                    </div>
                    <div>{item.name}</div>
                    <div>{item.symbol.toUpperCase()}</div>
                    <div>#{item.rank}</div>
                  </NavLink>
                </div>
              );
            }
          }
        });
      }
    }
  };

  return (
    <div>
      <Dropdown />
      {!allResultsVisibility && (
        <div
          onClick={() => {
            setAllResultsVisibility(true);
          }}
        >
          See all results
          {filteredListLength > 0 && "(" + filteredListLength + ")"}
        </div>
      )}
    </div>
  );
}
