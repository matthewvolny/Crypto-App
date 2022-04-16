import React from "react";

export default function ConditionalRenderList({ value, list }) {
  const Dropdown = () => {
    //if user enters value in search bar
    if (value) {
      console.log(list);

      //checks input value against list of coins for matches
      const filteredList = list.filter((item) => {
        return item.data
          .toString()
          .toLowerCase()
          .startsWith(value.toLowerCase());
      });
      console.log("filteredList");
      console.log(filteredList);
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
        return filteredList.map((item) => {
          console.log(item.data);
          return <div>{item.data}</div>;
        });
      }
    }
  };

  return (
    <div>
      <Dropdown />
    </div>
  );
}
