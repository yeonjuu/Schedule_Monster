import {
  faCaretLeft,
  faRotateRight,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { Controller } from 'types/calendarTypes';
import { CalendarController } from './CalendarStyles';
import React from 'react';

const DateController = ({ date, onClick }: Controller) => {
  return (
    <CalendarController>
      <button onClick={onClick.prev}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      {format(date, 'yyyy')}년 {format(date, 'MM')} 월
      <button onClick={onClick.next}>
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
      <button onClick={onClick.now}>
        <FontAwesomeIcon icon={faRotateRight} />
      </button>
    </CalendarController>
  );
};

export default DateController;
