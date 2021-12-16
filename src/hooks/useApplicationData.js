import { useEffect, useReducer, useRef } from 'react';

import { getDaysWithRemainingSpots } from 'helpers/selectors';

import { interviewDataActionTypes } from './interviewData.types';
import { setDayName, setInterviewData } from './interviewData.actions';

import axios from 'axios';

// LISTEN TO SERVER WEB SOCKET
const client = new WebSocket('ws://localhost:8001');

const INITIAL_DATA = {
  day: '',
  days: [],
  appointments: {},
  interviewers: {},
};

const reducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case interviewDataActionTypes.SET_INTERVIEW_DATA:
      return {
        ...state,
        ...action.payload,
      };
    // case interviewDataActionTypes.SET_DAY_NAME:
    //   return {
    //     ...state,
    //     day: action.payload,
    //   };
    default:
      return state;
  }
};

const useApplicationData = () => {
  const [interviewData, dispatch] = useReducer(reducer, INITIAL_DATA);
  const { day } = interviewData;

  // initiate useRef with initial day of Monday
  const dayRef = useRef('Monday');

  useEffect(() => {
    const getLatestDataFromServer = () =>
      Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers'),
      ])
        .then(([daysData, appointmentsData, interviewersData]) => {
          const interviewDataObj = {
            day: dayRef.current, // to stay in the same day as before state update
            days: daysData.data,
            appointments: appointmentsData.data,
            interviewers: interviewersData.data,
          };
          dispatch(setInterviewData(interviewDataObj));
        })
        .catch(err => console.log(err));

    // fetch data upon first render of App
    getLatestDataFromServer();

    // PRACTICE WEB SOCKET ==================================
    client.addEventListener('open', event => {
      const pingMsg = 'ping';
      client.send('Hello Server!');
      client.send(pingMsg);
      // console.log('Message to server: ', pingMsg);
    });
    // =======================================================

    // LISTEN FOR 'SET_INTERVIEW' ============================
    client.addEventListener('message', event => {
      const parsedData = JSON.parse(event.data);
      // console.log('Message from server: ', parsedData);

      if (parsedData.type === 'SET_INTERVIEW') {
        getLatestDataFromServer();
      }
    });
    // ======================================================
  }, []);

  const changeDayName = dayName => {
    // store the day in useRef
    dayRef.current = dayName;

    dispatch(setDayName(dayName));
  };

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
