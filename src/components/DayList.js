import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const { days, value, onChange } = props;

  const parsedDays = days.map(x =>
    <DayListItem
      key={x.id}
      name={x.name}
      spots={x.spots}
      selected={x.name === value}
      setDay={onChange}>
    </DayListItem>)
  return (
    <ul>
      {parsedDays}
    </ul>
  );
}