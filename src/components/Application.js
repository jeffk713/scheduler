import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DayList from 'components/DayList/DayList';
import Appointment from './Appointment';

import { getAppointmentsForDay, getInterview } from '../helpers/selectors';

import 'components/Application.scss';

export default function Application(props) {
  const INITIAL_DATA = {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  };
  const [interviewData, setInterviewData] = useState(INITIAL_DATA);
  const { day, days } = interviewData;

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then(([daysData, appointmentsData, interviewersData]) => {
        setInterviewData(prevState => ({
          ...prevState,
          days: daysData.data,
          appointments: appointmentsData.data,
          interviewers: interviewersData.data,
        }));
      })
      .catch(err => console.log(err));
  }, []);

  const dailyAppointments = getAppointmentsForDay(interviewData, day);

  const dailySchedule = dailyAppointments.map(appointment => {
    const interview = getInterview(interviewData, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={days} value={day} onChange={setInterviewData} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>{dailySchedule}</section>
    </main>
  );
}
