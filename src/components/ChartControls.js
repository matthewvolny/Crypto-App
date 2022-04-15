import React, { useState } from "react";
import "./chartControls.css";

export default function ChartControls(props) {
  const [actionClicked, setActionClicked] = useState();

  const dayButton = document.querySelector(".day");
  const weekButton = document.querySelector(".week");
  const monthButton = document.querySelector(".month");
  const yearButton = document.querySelector(".year");
  const allButton = document.querySelector(".all");

  const buttonDOMObject = {
    day: dayButton,
    week: weekButton,
    month: monthButton,
    year: yearButton,
    all: allButton,
  };

  //handles player actions, highlights and un-highlights action buttons
  const handleClick = (viewFieldValue, timeFrameValue, e) => {
    props.setViewFieldDuration(viewFieldValue);
    props.setTimeFrameToFetch(timeFrameValue);
    //
    if (!actionClicked) {
      console.log(e.target.value);
      e.target.setAttribute("id", "clicked");
      setActionClicked(e.target.className);
    } else {
      console.log(buttonDOMObject[actionClicked]);
      buttonDOMObject[actionClicked].removeAttribute("id");
      e.target.setAttribute("id", "clicked");
      setActionClicked(e.target.className);
    }
  };

  //!may or may not want to removeAttribute on selecting a new coin
  //unclicks player action buttons when changing rooms
  // useEffect(() => {
  // if (actionClicked) {
  //   actionDOMObject[actionClicked].removeAttribute("id");
  // }
  // }, [props.roomEvaluateDetails]);

  return (
    <div className="chart-controls">
      <div
        className="day"
        value="day"
        onClick={(e) => handleClick("1", "90", e)}
      >
        Day
      </div>
      <div
        className="week"
        value="week"
        onClick={(e) => handleClick("7", "90", e)}
      >
        Week
      </div>
      <div
        className="month"
        value="month"
        onClick={(e) => handleClick("30", "90", e)}
      >
        Month
      </div>
      <div
        className="year"
        value="year"
        onClick={(e) => handleClick("365", "max", e)}
      >
        Year
      </div>
      <div
        className="all"
        value="all"
        onClick={(e) => handleClick("max", "max", e)}
      >
        All
      </div>
    </div>
  );
}
