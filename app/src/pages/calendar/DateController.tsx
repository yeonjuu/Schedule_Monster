import {
  faCaretLeft,
  faRotateRight,
  faCaretRight,
  faCaretUp,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { Controller } from 'types/calendarTypes';
import { CalendarController } from './CalendarStyles';
import React from 'react';

const DateController = ({ date, onClick }: Controller) => {
  return (
    <CalendarController>
      <FontAwesomeIcon onClick={onClick.prev} icon={faCaretLeft} />
      <h3>{format(date, 'yyyy')}</h3><p>&nbsp;년&nbsp;&nbsp;</p><h3>{format(date, 'M')}</h3><p>&nbsp;월</p>
      <FontAwesomeIcon onClick={onClick.next} icon={faCaretRight} />
      <FontAwesomeIcon onClick={onClick.up} icon={faCaretUp} />
      <FontAwesomeIcon onClick={onClick.down} icon={faCaretDown} />
      <FontAwesomeIcon onClick={onClick.now} icon={faRotateRight} />
    </CalendarController>
  );
};

export default DateController;
