import React from 'react';
import { Event } from '../interfaces/event';

function CalendarEvent({ event }: { event: Event }) {
  const { id, title, description, startsAt, endsAt } = event;

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{startsAt.toString()}</p>
      <p>{endsAt.toString()}</p>
    </div>
  )
}


export default CalendarEvent;
