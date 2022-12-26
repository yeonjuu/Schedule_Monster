import {
  faCaretLeft,
  faRotateRight,
  faCaretRight,
  faCaretUp,
  faCaretDown
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
      <h3>{format(date, 'yyyy')}</h3> 년 <h3>{format(date, 'M')}</h3> 월
      <button onClick={onClick.next}>
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
     
      <button onClick={onClick.up}>
        <FontAwesomeIcon icon={faCaretUp} />
      </button>
      <button onClick={onClick.down}>
        <FontAwesomeIcon icon={faCaretDown} />
      </button>
    
      <button onClick={onClick.now}>
        <FontAwesomeIcon icon={faRotateRight} />
      </button>
    </CalendarController>
  );
};

export default DateController;
