import { useEffect, useReducer } from 'react';

import { getDaysWithRemainingSpots } from 'helpers/selectors';

import { interviewDataActionTypes } from './interviewData.types';
import { setDayName, setInterviewData } from './interviewData.actions';

import axios from 'axios';

const INITIAL_DATA = {
  day: 'Monday',
  days: [],
  appointments: {},
  interviewers: {},
};

const reducer = (state = INITIAL_DATA, action) => {
  console.log('what action fired? --', action);
  switch (action.type) {
    case interviewDataActionTypes.SET_INTERVIEW_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case interviewDataActionTypes.SET_DAY_NAME:
      return {
        ...state,
        day: action.payload,
      };
    default:
      return state;
  }
};

const useApplicationData = () => {
  const [interviewData, dispatch] = useReducer(reducer, INITIAL_DATA);
  const { day } = interviewData;

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then(([daysData, appointmentsData, interviewersData]) => {
        const interviewDataObj = {
          ...interviewData,
          days: daysData.data,
          appointments: appointmentsData.data,
          interviewers: interviewersData.data,
        };
        dispatch(setInterviewData(interviewDataObj));
      })
      .catch(err => console.log(err));
  }, []);

  const changeDayName = dayName => dispatch(setDayName(dayName));

  const bookInterview = (id, interview) => {
    // set updated appointment
    const updatedAppointment = {
      ...interviewData.appointments[id],
      interview,
    };
    // update interviewData with updated appointments array
    const interviewDataWithApps = {
      ...interviewData,
      appointments: {
        ...interviewData.appointments,
        [id]: updatedAppointment,
      },
    };
    // update interviewData with updated days array
    const interviewDataWithAppsAndDays = {
      ...interviewDataWithApps,
      days: getDaysWithRemainingSpots(interviewDataWithApps, day),
    };

    // update database with updated appointment
    return axios
      .put(`/api/appointments/${id}`, updatedAppointment)
      .then(() => dispatch(setInterviewData(interviewDataWithAppsAndDays)));
  };

  const cancelInterview = id => {
    // set updated appointment
    const updatedAppointment = {
      ...interviewData.appointments[id],
      interview: null,
    };
    // update interviewData with updated days array and updated appointments array
    const interviewDataWithApps = {
      ...interviewData,
      appointments: {
        ...interviewData.appointments,
        [id]: updatedAppointment,
      },
    };
    // update interviewData with updated days array
    const interviewDataWithAppsAndDays = {
      ...interviewDataWithApps,
      days: getDaysWithRemainingSpots(interviewDataWithApps, day),
    };

    // update database with updated appointment
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => dispatch(setInterviewData(interviewDataWithAppsAndDays)));
  };

  return {
    interviewData,
    changeDayName,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
