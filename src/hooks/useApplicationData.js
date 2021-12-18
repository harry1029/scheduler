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
        // Update the spots in days
        const updatedDays = updateSpots(appointments);
        setState({ ...state, appointments, days: updatedDays });
        // Return true to Promise condition in application.js
        return true;
      })
      .catch((error) => {
        console.log("Error: bookInterview Error!");
        // Return false to Promise condition in application.js
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
        // Update to new state after updating through lowest level (appointment) and then lower level (appointments)
        const updatedDays = updateSpots(appointments);
        setState({ ...state, appointments, days: updatedDays });
        return true;
      })
      .catch((error) => {
        console.log("Error: cancelInterview Error!");
        console.log(error.response.status);
        return false;
      })
  };

  function updateSpots(appointments) {
    let counter = 0;
    // Find the day we need from the state
    const findDay = state.days.find(x => x.name === state.day);

    // Iterate through all appointments and push into empty array if Day actually exists
    if (findDay) {
      for (const appointment of findDay['appointments']) {
        if (appointments[appointment]['interview'] === null) {
          console.log(appointments[appointment]);
          counter++;
        }
      };
    }
    const findDayIndex = state.days.findIndex(x => x.name === state.day);
    const updatedDay = {
      ...state.days[findDayIndex],
      spots: counter
    };
    const updatedDays = [...state.days];
    updatedDays[findDayIndex] = updatedDay;
    return updatedDays;
  }

  // Data Fetching
  useEffect(() => {
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