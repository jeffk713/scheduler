import React, { useState } from 'react';

import InterviewerList from 'components/InterviewerList/InterviewerList';
import Button from 'components/Button/Button';

import './styles.scss';

const Form = props => {
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  //to reset student name and interviewer and error message
  const reset = () => {
    setName('');
    setError('');
    setInterviewer(null);
  };

  const handleCancel = () => {
    reset();
    props.onCancel();
  };

  // check incomplete input and save
  const handleSave = () => {
    if (!name) {
      return setError("Please enter student's name");
    }
    if (!interviewer) {
      return setError('Please choose interviewer');
    }

    props.onSave(name, interviewer);

    reset();
  };

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={event => event.preventDefault()}>
          <input
            className='appointment__create-input text--semi-bold'
            value={name}
            onChange={event => setName(event.target.value)}
            type='text'
            placeholder='Enter Student Name'
            data-testid='student-name-input'
          />
        </form>
        <section className='appointment__validation'>{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={handleCancel}>
            Cancel
          </Button>
          <Button confirm onClick={handleSave}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
