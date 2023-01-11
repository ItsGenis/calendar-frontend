import { Event } from '../interfaces/event';

import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export function filterEventsForDate(events: Event[], date: Dayjs): Event[] {
  return events.filter((event: Event) => isEventInDate(event, date));
}

export function isEventInDate(event: Event, date: Dayjs): boolean {
  return dayjs(event.startsAt).isSameOrBefore(date) && dayjs(event.endsAt).isSameOrAfter(date);
}
