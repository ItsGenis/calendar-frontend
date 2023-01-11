import React from 'react';
import CalendarEvent from './CalendarEvent';
import { Event } from '../interfaces/event';

import dayjs, { Dayjs } from 'dayjs';
import { filterEventsForDate } from '../lib/DateHelpers';

function EventList({ events, currentDate }: { events: Event[]; currentDate: Dayjs }) {
  return (
    <div className='event-list'>
      <h2>Events for {dayjs(currentDate).format('dddd, MMMM Do YYYY')}</h2>

      <div className='events'>
        {filterEventsForDate(events, currentDate)
          .sort((eventA: Event, eventB: Event) =>
            dayjs(eventA.startsAt).diff(dayjs(eventB.startsAt)),
          )
          .map((event: Event) => (
            <CalendarEvent key={event.id} event={event} />
          ))}
      </div>
    </div>
  );
}

export default EventList;
