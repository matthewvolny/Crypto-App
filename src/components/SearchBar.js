import React, { useState, useContext } from "react";
import Context from "../context/context";
import SearchList from "./SearchList";
import { useNavigate } from "react-router-dom";
import "./searchBar.css";

export default function SearchBar() {
  const { setSelectedCoinData } = useContext(Context);
  const [value, setValue] = useState("");
  const [searchListVisibility, setSearchListVisibility] = useState(true);
  const [firstListItem, setFirstListItem] = useState();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const clearSearchBar = () => {
    setSearchListVisibility(false);
    setValue("");
    setSearchListVisibility(true);
  };

  const navigate = useNavigate();

  const typedValueSearch = (e) => {
    e.preventDefault();
    console.log("form submitted");
    console.log(firstListItem.name);
    setSelectedCoinData(firstListItem);
    navigate(`/currencies/${firstListItem.name}`);
    setValue("");
  };

  return (
    <div className="searchbar-container">
      <form onSubmit={typedValueSearch}>
        <input
          onChange={handleChange}
          value={value}
          type="text"
          placeholder="Search cryptocurrencies"
        />
      </form>
      {searchListVisibility && (
        <SearchList
          value={value}
          clearSearchBar={clearSearchBar}
          setFirstListItem={setFirstListItem}
        />
      )}
    </div>
  );
}
