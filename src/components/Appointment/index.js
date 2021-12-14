import React from 'react';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';

const Appointment = props => {
  const { mode, back, transition } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const saveInterview = (name, interviewer) => {
    // set saving mode
    transition(SAVING);

    const interview = {
      student: name,
      interviewer,
    };

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => console.log(err));
  };

  const deleteInterview = id => {
    //set deleting mode
    transition(DELETING);

    props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(err => console.log(err));
  };

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={saveInterview}
        />
      )}
      {mode === SAVING && <Status message='Saving...' />}
      {mode === DELETING && <Status message='Deleting...' />}
      {mode === CONFIRM && (
        <Confirm
          message='Are you sure to delete?'
          onCancel={() => back()}
          onConfirm={() => deleteInterview(props.id)}
        />
      )}
    </article>
  );
};

export default Appointment;
