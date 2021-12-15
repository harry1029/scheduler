export function getAppointmentsForDay(state, day) {
  // Find the day we need from the state
  const findDay = state.days.find(x => x.name === day);

  const filteredAppointments = [];
  // Iterate through all appointments and push into empty array if Day actually exists
  if (findDay) {
    for (const appointment of findDay['appointments']) {
      filteredAppointments.push(state.appointments[appointment]);
    };  
  }

  return filteredAppointments;
}


export function getInterviewersForDay(state, day) {
  // Find the day we need from the state
  const findDay = state.days.find(x => x.name === day);

  const filteredInterviewers = [];
  // Iterate through all interviews and push into empty array if Day actually exists
  if (findDay) {
    for (const interviewer of findDay['interviewers']) {
      filteredInterviewers.push(state.interviewers[interviewer]);
    };  
  }

  return filteredInterviewers;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  };
  const result = {};
  result["student"] = interview.student;
  result["interviewer"] = state.interviewers[interview.interviewer];

  return result;
}