import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Badge, Calendar } from 'antd';
import 'react-calendar/dist/Calendar.css';
import EventCreateForm from '../components/EventCreateForm';
import EventList from '../components/EventList';
import { GET_EVENTS } from '../graphql/queries';
import { Event } from '../interfaces/event';
import { Dayjs } from 'dayjs';

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function HomePage() {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const { events } = data;

  const dateCellRender = (date: Dayjs) => {
    return (
      <ul>
        {events
          .filter(
            (event: Event) =>
              dayjs(event.startsAt).isSameOrBefore(date) && dayjs(event.endsAt).isSameOrAfter(date),
          )
          .map((event: Event) => (
            <li key={event.id}>
              <Badge status={'processing'} text={event.title} />
            </li>
          ))}
      </ul>
    );
  };

  return (
    <>
      <EventCreateForm />

      <div className='calendar-wrapper'>
        <Calendar
          className='calendar-desktop'
          onSelect={setCurrentDate}
          dateCellRender={dateCellRender}
          mode='month'
        />
        <Calendar
          className='calendar-mobile'
          onSelect={setCurrentDate}
          fullscreen={false}
          mode='month'
        />
      </div>

      <EventList events={events} currentDate={currentDate} />
    </>
  );
}

export default HomePage;
