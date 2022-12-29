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
import { CalendarList } from 'components/calendar/CalendarList';
import { Delete } from 'components/calendar/Delete';
import { Share } from 'components/calendar/Share';

const DateController = ({ date, onClick }: Controller) => {
  return (
    <CalendarController>
     
      <CalendarList/>
      <div style={{marginRight: '90px'}}>
      <FontAwesomeIcon onClick={onClick.prev} icon={faCaretLeft} />
      {/* <FontAwesomeIcon onClick={onClick.up} icon={faCaretUp} /> */}
      <h3>{format(date, 'yyyy')}</h3><p>&nbsp;년&nbsp;&nbsp;</p><h3>{format(date, 'M')}</h3><p>&nbsp;월</p>
      {/* <FontAwesomeIcon onClick={onClick.down} icon={faCaretDown} /> */}
      <FontAwesomeIcon onClick={onClick.next} icon={faCaretRight} />
      <FontAwesomeIcon onClick={onClick.now} icon={faRotateRight} />
      </div>
       
      <Share/>
    </CalendarController>
  );
};

export default DateController;
