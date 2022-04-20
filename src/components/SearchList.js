import React, { useContext, useEffect, useState } from "react";
import DropdownItem from "./DropdownItem";
import Context from "../context/context";
import axios from "axios";
import "./searchList.css";

export default function SearchList({
  value,
  list,
  clearSearchBar,
  firstListItem,
  setFirstListItem,
}) {
  // console.log(value, list);
  const { coinData, setSelectedCoinData } = useContext(Context);
  const [filteredList, setFilteredList] = useState([]);
  const [allResultsVisibility, setAllResultsVisibility] = useState(false);
  const [selectedCoinDataWithDescription, setSelectedCoinDataWithDescription] =
    useState();

  //adds "description" to coin selectedCoinInfo
  const fetchCoinDescription = (coin) => {
    console.log("in fetchCoinDescription");
    console.log(coin);
    console.log(coin.id);
    //investigate that again
    let selectedCoinInfo = coin;
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coin.id}`)
      .then((response) => {
        const data = response.data;
        // console.log(data);
        // console.log(data.description.en);
        selectedCoinInfo.description = data.description.en;
        // console.log("selectedCoinInfo");
        // console.log(selectedCoinInfo);
        if (firstListItem) {
          setFirstListItem(selectedCoinInfo);
        }
        setSelectedCoinDataWithDescription(selectedCoinInfo);
      });
  };

  //!seems to be getting called as hovering over list items

  //returns list of coins that match search input
  useEffect(() => {
    if (value) {
      const filteredList = coinData.filter((item) => {
        return item.name
          .toString()
          .toLowerCase()
          .startsWith(value.toLowerCase());
      });
      console.log("filteredList");
      console.log(filteredList);
      setFilteredList(filteredList);
    }
  }, [value]);

  useEffect(() => {
    if (filteredList.length !== 0) {
      setFirstListItem(true);
      console.log("filtered list first item");
      console.log(filteredList[0]);
      fetchCoinDescription(filteredList[0]);
    }
  }, [filteredList]);

  // const Dropdown = () => {
  //   //if user enters value in search bar
  //   if (value) {
  //     // console.log(list);

  //     //checks input value against list of coins for matches
  //     const filteredList = coinData.filter((item) => {
  //       return item.name
  //         .toString()
  //         .toLowerCase()
  //         .startsWith(value.toLowerCase());
  //     });
  //     console.log("filteredList");
  //     console.log(filteredList);
  //     // setFilteredListLength(filteredList.length);
  //     //   setFilteredCoinList(filteredList);
  //     if (filteredList.length === 0) {
  //       return (
  //         <div>
  //           <div>No results for '{value}'</div>
  //           <div>We couldn't find anything matching your search.</div>
  //           <div>Try again with a different term.</div>
  //         </div>
  //       );
  //     } else {
  //       console.log("filtered list found");
  //       return filteredList.map((item, index) => {
  //         //makes first list item retrievable on form submit (click "enter" in searchBar component)
  //         if (index === 0) {
  //           fetchCoinDescription(item);
  //           setFirstListItem(selectedCoinDataWithDescription);
  //           // setSelectedCoinData(item);
  //         }
  //         if (allResultsVisibility) {
  //           //does this need to be here
  //           return (
  //             <div className="search-item">
  //               <NavLink
  //                 //!this onEnter gets called over and over
  //                 onMouseEnter={() => {
  //                   console.log("item on hover");
  //                   console.log(item);
  //                   fetchCoinDescription(item); //not always correct for 2+ coin in list
  //                 }}
  //                 onClick={() => {
  //                   setSelectedCoinData(selectedCoinDataWithDescription);
  //                   clearSearchBar();
  //                   setAllResultsVisibility(false);
  //                 }}
  //                 to={`/currencies/${item.name}`}
  //                 key={item.id}
  //               >
  //                 <div>
  //                   <img className="icon" alt="search-icon" src={item.image} />
  //                 </div>
  //                 <div>{item.name}</div>
  //                 <div>{item.symbol.toUpperCase()}</div>
  //                 <div>#{item.rank}</div>
  //               </NavLink>
  //             </div>
  //           );
  //         } else {
  //           if (index < 4) {
  //             return (
  //               <div className="search-item">
  //                 <NavLink
  //                   //!this onEnter gets called over and over
  //                   onMouseEnter={() => {
  //                     console.log("item on hover");
  //                     console.log(item);
  //                     console.log(item.name);
  //                     // debugger;
  //                     fetchCoinDescription(item);
  //                   }}
  //                   onClick={() => {
  //                     setSelectedCoinData(selectedCoinDataWithDescription);
  //                     clearSearchBar();
  //                     setAllResultsVisibility(false);
  //                   }}
  //                   to={`/currencies/${item.name}`}
  //                   key={item.id}
  //                 >
  //                   <div>
  //                     <img
  //                       className="icon"
  //                       alt="search-icon"
  //                       src={item.image}
  //                     />
  //                   </div>
  //                   <div>{item.name}</div>
  //                   <div>{item.symbol.toUpperCase()}</div>
  //                   <div>#{item.rank}</div>
  //                 </NavLink>
  //               </div>
  //             );
  //           }
  //         }
  //       });
  //     }
  //   }
  // };

  const clearDropdownList = () => {
    setAllResultsVisibility(false);
  };

  const noResultsMessage = (
    <div>
      <div>No results for '{value}'</div>
      <div>We couldn't find anything matching your search.</div>
      <div>Try again with a different term.</div>
    </div>
  );

  return (
    <div>
      {filteredList?.length === 0
        ? noResultsMessage
        : filteredList?.map((item, index) => {
            //makes first list item retrievable on form submit (click "enter" in searchBar component)
            //!area is a problem because it registers first item on all others in the list
            // if (index === 0) {
            //   setFirstListItem(true);
            //   fetchCoinDescription(item);
            // }
            if (allResultsVisibility) {
              return (
                <DropdownItem
                  item={item}
                  fetchCoinDescription={fetchCoinDescription}
                  //setSelectedCoinData={setSelectedCoinData}
                  setAllResultsVisibility={allResultsVisibility}
                  selectedCoinDataWithDescription={
                    selectedCoinDataWithDescription
                  }
                  clearSearchBar={clearSearchBar}
                  clearDropdownList={clearDropdownList}
                />
              );
            } else {
              if (index < 4) {
                return (
                  <DropdownItem
                    item={item}
                    fetchCoinDescription={fetchCoinDescription}
                    //setSelectedCoinData={setSelectedCoinData}
                    setAllResultsVisibility={allResultsVisibility}
                    selectedCoinDataWithDescription={
                      selectedCoinDataWithDescription
                    }
                    clearSearchBar={clearSearchBar}
                    clearDropdownList={clearDropdownList}
                  />
                );
              }
            }
          })}
      {!allResultsVisibility && (
        <div
          onClick={() => {
            setAllResultsVisibility(true);
          }}
        >
          See all results
          {filteredList.length > 0 && "(" + filteredList.length + ")"}
        </div>
      )}
    </div>
  );
}
