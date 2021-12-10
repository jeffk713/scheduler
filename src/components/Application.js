import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DayList from 'components/DayList/DayList';
import Appointment from './Appointment';

import 'components/Application.scss';

export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get('/api/days')
      .then(res => {
        console.log(res.data); // array
        setDays(res.data);
      })
      .catch(err => console.log(err));

    axios
      .get('/api/appointments')
      .then(res => {
        console.log(res.data); //object
        setAppointments(Object.values(res.data));
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
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {appointments.map(appointment => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
      </section>
    </main>
  );
}
