import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DayList from 'components/DayList/DayList';
import Appointment from './Appointment';

import { getAppointmentsForDay } from '../helpers/selectors';

import 'components/Application.scss';

const INITIAL_DATA = {
  day: 'Monday',
  days: [],
  appointments: {},
};

export default function Application(props) {
  const [interviewData, setInterviewData] = useState(INITIAL_DATA);
  const { day, days } = interviewData;

  useEffect(() => {
    Promise.all([axios.get('/api/days'), axios.get('/api/appointments')])
      .then(([days, appointments]) => {
        setInterviewData(prevState => ({
          ...prevState,
          days: days.data,
          appointments: appointments.data,
        }));
      })
      .catch(err => console.log(err));
  }, []);

  const dailyAppointments = getAppointmentsForDay(interviewData, day);

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
      <section className='schedule'>
        {dailyAppointments.map(appointment => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
      </section>
    </main>
  );
}
