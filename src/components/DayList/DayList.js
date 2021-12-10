import React from 'react';

import DayListItem from 'components/DayListItem/DayListItem';

const DayList = props => {
  return (
    <ul>
      {props.days.map(day => (
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.value}
          setInterviewData={props.onChange}
        />
      ))}
    </ul>
  );
};

export default DayList;
