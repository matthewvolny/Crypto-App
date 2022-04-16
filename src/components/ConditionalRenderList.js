import React, { useContext } from "react";
import Context from "../context/context";

export default function ConditionalRenderList({ value, list }) {
  const { allCoinIds } = useContext(Context);

  const Dropdown = () => {
    //if user enters value in search bar
    if (value) {
      console.log(list);

      //checks input value against list of coins for matches
      const filteredList = allCoinIds.filter((item) => {
        return item.name
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
          return (
            <div className={item.id}>
              <div>
                <img alt="icon" src="" />
              </div>
              <div>{item.name}</div>
              <div>{item.symbol.toUpperCase()}</div>
            </div>
          );
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
