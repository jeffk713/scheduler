import { interviewDataActionTypes } from './interviewData.types';

export const setInterviewData = interviewData => ({
  type: interviewDataActionTypes.SET_INTERVIEW_DATA,
  payload: interviewData,
});

export const setDayName = dayName => ({
  type: interviewDataActionTypes.SET_DAY_NAME,
  payload: dayName,
});
