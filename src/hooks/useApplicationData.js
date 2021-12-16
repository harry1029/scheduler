import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
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

    return (axios.put(`http://localhost:8001/api/appointments/${id}`, {
      id,
      interview,
    })
      .then(response => {
        console.log("Updated Appointments in BookInterview!");
        // Update to new state after updating through lowest level (appointment) and then lower level (appointments)
        setState({ ...state, appointments });
        // Return true to Promise condition in application.js
        return true;
      })
      .catch((error) => {
        console.log("Error: bookInterview Error!");
        console.log(error.response.status);
        // Return true to Promise condition in application.js
        return false;
      }))
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

    return (axios.delete(`http://localhost:8001/api/appointments/${id}`))
      .then(response => {
        console.log("Deleted Appointments in cancelInterview!");
        console.log("Response after DELETE: ", response);
        // Update to new state after updating through lowest level (appointment) and then lower level (appointments)
        setState({ ...state, appointments });
        return true;
      })
      .catch((error) => {
        console.log("Error: cancelInterview Error!");
        console.log(error.response.status);
        return false;
      })
  };

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

  return { state, setDay, bookInterview, cancelInterview };
}