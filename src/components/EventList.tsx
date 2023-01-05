import React from 'react';
import CalendarEvent from './CalendarEvent';
import { Event } from '../interfaces/event';

import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function EventList({ events, currentDate }: { events: any; currentDate: Dayjs }) {
  return events
    .filter(
      (event: Event) =>
        dayjs(event.startsAt).isSameOrBefore(currentDate) &&
        dayjs(event.endsAt).isSameOrAfter(currentDate),
    )
    .sort((eventA: Event, eventB: Event) => dayjs(eventA.startsAt).diff(dayjs(eventB.startsAt)))
    .map((event: Event) => <CalendarEvent key={event.id} event={event} />);
}

export default EventList;
