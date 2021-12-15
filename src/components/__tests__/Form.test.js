/*
  We are rendering `<Appointment />` down below, so we need React.createElement
*/
import React from 'react';

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, cleanup, fireEvent } from '@testing-library/react';

import Form from 'components/Appointment/Form';

afterEach(cleanup);

describe('Form', () => {
  const interviewers = [
    {
      id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png',
    },
  ];

  it('renders without student name if not provided', () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });

  it('renders with initial student name', () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name='Lydia Miller-Jones' />
    );
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
  });

  it('validates that the student name is not blank', () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
    fireEvent.click(getByText('Save'));

    // validation is shown
    expect(getByText(/Please enter student's name/i)).toBeInTheDocument();

    // onSave is not called
    expect(onSave).not.toHaveBeenCalled();
  });

  it('calls onSave function with valid student name and invalid interviewer', () => {
    const onSave = jest.fn();
    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name='Lydia Miller-Jones'
        onSave={onSave}
      />
    );
    fireEvent.click(getByText('Save'));

    // validation is shown
    expect(queryByText(/Please enter student's name/i)).toBeNull();
    expect(getByText(/Please choose interviewer/i)).toBeInTheDocument();

    //onSave is not called
    expect(onSave).not.toHaveBeenCalled();
  });

  it('calls onSave function with valid student name and interviewer', () => {
    const onSave = jest.fn();
    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name='Lydia Miller-Jones'
        interviewer={1}
        onSave={onSave}
      />
    );
    fireEvent.click(getByText('Save'));

    // validation is not shown
    expect(queryByText(/Please enter student's name/i)).toBeNull();
    expect(queryByText(/Please choose interviewer/i)).toBeNull();

    // onSave is called once
    expect(onSave).toHaveBeenCalledTimes(1);

    // onSave is called with the correct arguments
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 1);
  });

  it('can successfully save after trying to submit an empty student name', () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );

    fireEvent.click(getByText('Save'));

    expect(getByText(/Please enter student's name/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' },
    });

    fireEvent.click(getByText('Save'));

    expect(queryByText(/Please enter student's name/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 1);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/Please enter student's name/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
