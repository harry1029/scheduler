import React from "react";

import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  const { interviewers, interviewer, setInterviewer } = props;

  const parsedInterviewers = interviewers.map(x => <InterviewerListItem key={x.id} id={x.id} name={x.name} avatar={x.avatar} selected={x.id === interviewer} setInterviewer={setInterviewer}></InterviewerListItem>)
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        { parsedInterviewers }
      </ul>
    </section>
  )
}