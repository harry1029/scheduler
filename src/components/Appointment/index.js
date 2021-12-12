import React, { Fragment } from 'react'

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "./styles.scss";

export default function Appointment(props) {


  const { time } = props;

  return (
    <article className="appointment">
      <Header time={time} />
      {!props.interview && <Empty />}
      {props.interview && <Show student={props.interview['student']} interviewer={props.interview['interviewer']} />}
    </article>
  )
}