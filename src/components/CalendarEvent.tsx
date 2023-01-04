import React from 'react';
import moment from 'moment';
import { Event } from '../interfaces/event';

function CalendarEvent({ event }: { event: Event }) {
  const { id, title, description, startsAt, endsAt } = event;

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Starts on: {moment(startsAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
      <p>Ends on: {moment(endsAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
    </div>
  )
}


export default CalendarEvent;
