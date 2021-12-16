import React from 'react'

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';

import "./styles.scss";
import Form from './Form';
import Confirm from './Confirm';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { time, interviewers } = props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // Transition to Saving state while waiting for Axios to finish PUT request
    transition(SAVING);
    // After resolving the promise in bookInterview, transition to SHOW form
    Promise.resolve(props.bookInterview(props.id, interview))
      .then(response => {
        console.log("Updating Appointment Forms!");
        return transition(SHOW, true);
      });
  }

  function del(id) {

    // Transition to Deleting state while waiting for Axios to finish DELETE request
    transition(DELETING);
    // After resolving the promise in cancelInterview, transition to SHOW form
    Promise.resolve(props.cancelInterview(props.id))
      .then(response => {
        console.log("Cancelled Appointment Forms!");
        return transition(EMPTY, true);
      })
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onConfirm={del} onCancel={() => back()} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => transition(CREATE)} onDelete={() => transition(CONFIRM)}/>}
      {mode === CREATE && <Form interviewers={interviewers} student={props.interview ? props.interview.student : ""} interviewer={props.interview ? props.interview.interviewer.id : null} onCancel={() => back()} onSave={save} />}
    </article>
  )
}