import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DayList from 'components/DayList/DayList';
import Appointment from './Appointment';

import { getAppointmentsForDay } from '../helpers/selectors';

import 'components/Application.scss';

const INITIAL_DATA = {
  day: null,
  days: [],
  appointments: {},
};

export default function Application(props) {
  const [interviewData, setInterviewData] = useState(INITIAL_DATA);
  const { day, days } = interviewData;

  useEffect(() => {
    axios
      .get('/api/days')
      .then(res => {
        console.log(res.data); // array
        setInterviewData(prevState => ({ ...prevState, days: res.data }));
      })
      .catch(err => console.log(err));

    axios
      .get('/api/appointments')
      .then(res => {
        console.log(res.data); //object
        setInterviewData(prevState => ({
          ...prevState,
          appointments: res.data,
        }));
      })
      .catch(err => console.log(err));
  }, []);

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
        {getAppointmentsForDay(interviewData, day).map(appointment => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
      </section>
    </main>
  );
}
