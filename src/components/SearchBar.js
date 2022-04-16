import React, { useState } from "react";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}
          type="text"
          placeholder="Search cryptocurrencies"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
