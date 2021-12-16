import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];

export default function Application(props) {

  // const [ days, setDays ] = useState([]);

  // const [ day, setDay ] = useState("Monday");

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // };

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Promise.resolve(axios.put(`http://localhost:8001/api/appointments/${id}`, {
      id,
      interview,
    }))
    .then(response => {
      console.log("Updated Appointments in BookInterview!");
      // Update to new state after updating through lowest level (appointment) and then lower level (appointments)
      setState({ ...state, appointments });
    })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Promise.resolve(axios.delete(`http://localhost:8001/api/appointments/${id}`))
    .then(response => {
      console.log("Deleted Appointments in cancelInterview!");
      console.log("Response after DELETE: ", response);
      // Update to new state after updating through lowest level (appointment) and then lower level (appointments)
      setState({ ...state, appointments });
    })
  };

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const parsedAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        // Note: Put spread operator at the top to avoid override of assigning values
        {...appointment}
        key={appointment.id}
        interviewers={interviewers}
        interview={interview}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  });

  // Data Fetching
  useEffect(() => {
    // axios.get(requestUrl)
    //   .then(response => {
    //     setDays([...response.data]);
    //     // console.log(response.data);
    //   });

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')

      // all is an array of ALL the requests
    ]).then((all) => {
      const [first, second, third] = all;

      setState(prev => ({ ...prev, days: first.data, appointments: second.data, interviewers: third.data }));
      console.log("Refresh!");
    })
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />


        <nav className="sidebar__menu">
          <DayList
            days={state['days']}
            value={state['day']}
            onChange={day => setDay(day)}
          />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
