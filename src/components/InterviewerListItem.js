import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const { id, name, avatar, selected, setInterviewer } = props;

  const interviewerClass = classNames('interviewers__item', {'interviewers__item--selected': selected});

  return (
    <li className={interviewerClass} onClick={() => setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      {selected && name}
    </li>
  )
}
