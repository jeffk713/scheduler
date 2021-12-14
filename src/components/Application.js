import React from 'react';

import DayList from 'components/DayList/DayList';
import Appointment from './Appointment';

import useApplicationData from 'hooks/useApplicationData';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from '../helpers/selectors';

import 'components/Application.scss';

const INITIAL_DATA = {
  day: 'Monday',
  days: [],
  appointments: {},
  interviewers: {},
};

export default function Application(props) {
  const { interviewData, setInterviewData, bookInterview, cancelInterview } =
    useApplicationData(INITIAL_DATA);
  const { day, days } = interviewData;

  const dailyAppointments = getAppointmentsForDay(interviewData, day);
  const dailyInterviewers = getInterviewersForDay(interviewData, day);

  const dailySchedule = dailyAppointments.map(appointment => {
    const interview = getInterview(interviewData, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
