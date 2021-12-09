import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const { days, day, setDay } = props;

  const parsedDays = days.map(x => <DayListItem key={x.id} name={x.name} spots={x.spots} selected={x.name === day} setDay={setDay}></DayListItem>)
  return (
    <ul>
      { parsedDays }
    </ul>
  );
}