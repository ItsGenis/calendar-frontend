import moment from 'moment';
import React from 'react';
import CalendarEvent from './CalendarEvent';
import { Event } from '../interfaces/event';

function EventList({ events, currentDate }: { events: any, currentDate: Date }) {
  return events
    .filter((event: Event) => moment(currentDate).isBetween(event.startsAt, event.endsAt))
    .map((event: Event) => <CalendarEvent key={event.id} event={event} />);
}

export default EventList;
