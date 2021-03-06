import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, setDay } = props;

  const dayClass = classNames('day-list__item', { 'day-list__item--selected': props.selected }, { 'day-list__item--full': props.spots === 0 });

  return (
    <li className={dayClass} onClick={() => setDay(name)} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      {props.spots > 1 && <h3 className="text--light">{spots} spots remaining</h3>}
      {props.spots === 1 && <h3 className="text--light">{spots} spot remaining</h3>}
      {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
    </li>
  );
}