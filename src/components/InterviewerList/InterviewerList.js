import React from 'react';
import PropTypes from 'prop-types';

import InterviewerListItem from 'components/InterviewerListItem/InterviewerListItem';

import './InterviewerList.scss';
//
const InterviewerList = ({ interviewers, value, onChange }) => {
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>
        {interviewers.map(interviewer => (
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === value}
            setInterviewer={() => onChange(interviewer.id)}
          />
        ))}
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
};

export default InterviewerList;
