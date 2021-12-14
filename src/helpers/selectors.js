export const getAppointmentsForDay = (state, dayName) => {
  //find the index for the day
  const indexForDay = state.days.findIndex(day => day.name === dayName);
  //if no index, return []
  if (indexForDay === -1) return [];

  //get appointment key array for the day with the index
  const dayAppointmentKeyArr = state.days[indexForDay].appointments;

  //return an array of appointment for the day
  return dayAppointmentKeyArr.map(key => state.appointments[key]);
};

export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }

  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
};

export const getInterviewersForDay = (state, dayName) => {
  //find the index for the day
  const indexForDay = state.days.findIndex(day => day.name === dayName);
  //if no index, return []
  if (indexForDay === -1) return [];

  //get appointment key array for the day with the index
  const dayInterviewerKeyArr = state.days[indexForDay].interviewers;

  //return an array of appointment for the day
  return dayInterviewerKeyArr.map(key => state.interviewers[key]);
};

export const getNumOfRemainingSpotsForDay = (state, dayName) => {
  //get appointments for day
  const appsForDayArr = getAppointmentsForDay(state, dayName);

  const appsForDayNoInterviewArr = appsForDayArr.filter(app => !app.interview);

  return appsForDayNoInterviewArr.length;
};
