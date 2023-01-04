import moment from 'moment';
import React from 'react';
import CalendarEvent from './CalendarEvent';
import { Event } from '../interfaces/event';

function EventList({ events, currentDate }: { events: any; currentDate: Date }) {
  return events
    .filter(
      (event: Event) =>
        moment(event.startsAt).isSameOrBefore(currentDate) &&
        moment(event.endsAt).isSameOrAfter(currentDate),
    )
    .sort((eventA: Event, eventB: Event) => moment(eventA.startsAt).diff(moment(eventB.startsAt)))
    .map((event: Event) => <CalendarEvent key={event.id} event={event} />);
}

export default EventList;
