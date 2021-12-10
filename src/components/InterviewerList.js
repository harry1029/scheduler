import React from "react";

import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  const { interviewers, value, onChange } = props;

  const parsedInterviewers = interviewers.map(x =>
    <InterviewerListItem
      key={x.id}
      name={x.name}
      avatar={x.avatar}
      selected={x.id === value}
      setInterviewer={() => onChange(x.id)}>
    </InterviewerListItem>
  )
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  )
}