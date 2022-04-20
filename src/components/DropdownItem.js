import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Context from "../context/context";

export default function DropdownItem({
  item,
  fetchCoinDescription,
  //   setSelectedCoinData,
  setAllResultsVisibility,
  selectedCoinDataWithDescription,
  clearSearchBar,
  clearDropdownList,
}) {
  const { selectedCoinData, setSelectedCoinData } = useContext(Context);
  return (
    <div
      key={item.id}
      className="search-item"
      onMouseEnter={() => {
        console.log("item on hover");
        console.log(item);
        fetchCoinDescription(item); //not always correct for 2+ coin in list
      }}
    >
      <NavLink
        //!this onEnter gets called over and over

        onClick={() => {
          console.log(selectedCoinData);
          setSelectedCoinData(selectedCoinDataWithDescription);
          clearSearchBar();
          clearDropdownList();
        }}
        to={`/currencies/${item.name}`}
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
