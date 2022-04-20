import React from "react";
import { NavLink } from "react-router-dom";

export default function DropdownItem({
  item,
  fetchCoinDescription,
  setSelectedCoinData,
  setAllResultsVisibility,
  selectedCoinDataWithDescription,
  clearSearchBar,
}) {
  return (
    <div className="search-item">
      <NavLink
        //!this onEnter gets called over and over
        onMouseEnter={() => {
          console.log("item on hover");
          console.log(item);
          fetchCoinDescription(item); //not always correct for 2+ coin in list
        }}
        onClick={() => {
          setSelectedCoinData(selectedCoinDataWithDescription);
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
}
