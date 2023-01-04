import React from 'react';
import moment from 'moment';
import { Event } from '../interfaces/event';
import { Card } from 'antd';

function CalendarEvent({ event }: { event: Event }) {
  const { id, title, description, startsAt, endsAt } = event;

  return (
    <Card title={title}>
      <p>{description}</p>
      <p>Starts on: {moment(startsAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
      <p>Ends on: {moment(endsAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
    </Card>
  )
}


export default CalendarEvent;
