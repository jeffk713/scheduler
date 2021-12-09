import React from 'react';
import classNames from 'classnames';

import './DayListItem.scss';

export default function DayListItem(props) {
  const formatSpots = spot => {
    if (spot === 0) {
      return 'no spots remaining';
    }
    if (spot === 1) {
      return '1 spot remaining';
    }
    return `${spot} spots remaining`;
  };
  return (
    <li
      className={classNames(
        'day-list__item',
        { 'day-list__item--selected': props.selected },
        { 'day-list__item--full': props.spots === 0 }
      )}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots(props.spots)}</h3>
    </li>
  );
}
