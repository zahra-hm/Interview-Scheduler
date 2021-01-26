import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview, getInterviewsForDay} from "helpers/selectors";

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
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "3pm",
//     interview: {
//       student: "Naomi Campbell",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "12pm",
//     interview: {
//       student: "Justin Timberlake",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // const dailyAppointments = [];
  const setDay = day => setState({...state, day});
  // const appointments = getAppointmentsForDay(state, state.day).map(appointment => {
  //   return(
  //     <Appointment id={appointment.id} time={appointment.time} interview={appointment.interview} />
  //   )
  // })

  useEffect(()=>{
    axios.get('http://localhost:8001/api/days')
      .then(response =>{
        // console.log(response.data)
        Promise.all([
          Promise.resolve(axios.get("http://localhost:8001/api/days")),
          Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
          Promise.resolve(axios.get("http://localhost:8001/api/interviewers")),
        ]).then(all => {

          setState(prev => ({ 
            ...prev,
            days: all[0].data, 
            appointments: all[1].data,
            interviewers: all[2].data}));
        });
      })
  }, [])

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewsForDay(state, state.day);
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"/> 
        
      </section>
      <section className="schedule">
        {schedule}
      </section>
      
    </main>
  );
}
