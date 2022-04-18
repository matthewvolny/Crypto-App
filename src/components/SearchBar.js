import React, { useState } from "react";
import SearchList from "./SearchList";
import "./searchBar.css";

//comes from app.js
// const list = [
//   { id: 1, data: "pizza" },
//   { id: 2, data: "beer" },
//   { id: 3, data: "pasta" },
//   { id: 4, data: "broccoli" },
//   { id: 5, data: "cheetos" },
// ];

export default function SearchBar() {
  const [value, setValue] = useState("");
  const [searchListVisibility, setSearchListVisibility] = useState(true);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const clearSearchBar = () => {
    setSearchListVisibility(false);
    setValue("");
    setSearchListVisibility(true);
  };

  return (
    <div className="searchbar-container">
      <input
        onChange={handleChange}
        value={value}
        type="text"
        placeholder="Search cryptocurrencies"
      />
      {searchListVisibility && (
        <SearchList value={value} clearSearchBar={clearSearchBar} />
      )}
    </div>
  );
}
