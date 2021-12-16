import React, { useEffect } from 'react';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE ';

const Appointment = props => {
  const { mode, back, transition } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (mode === EMPTY && props.interview) {
      transition(SHOW);
    }
    if (mode === SHOW && !props.interview) {
      transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

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
      .catch(() => transition(ERROR_SAVE, true));
  };

  const deleteInterview = id => {
    //set deleting mode
    transition(DELETING);

    props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          interview={props.interview}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => back()}
          onSave={saveInterview}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={back} message={'Could not update appointment.'} />
      )}
      {mode === ERROR_DELETE && (
        <Error onClose={back} message={'Could not delete appointment.'} />
      )}
    </article>
  );
};

export default Appointment;
