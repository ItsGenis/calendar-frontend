import { useQuery } from '@apollo/client';
import moment from 'moment';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventCreateForm from '../components/EventCreateForm';
import EventList from '../components/EventList';
import { GET_EVENTS } from '../graphql/queries';
import { Event } from '../interfaces/event';

function HomePage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { loading, error, data } = useQuery(GET_EVENTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const { events } = data;

  function tileClassName({ date }: { date: Date }): string {
    if (
      events.find(
        (event: Event) =>
          moment(event.startsAt).isSameOrBefore(date) && moment(event.endsAt).isSameOrAfter(date),
      )
    ) {
      return 'with-events';
    } else {
      return '';
    }
  }

  return (
    <>
      <Calendar view='month' onClickDay={setCurrentDate} tileClassName={tileClassName} />
      <div>
        <h2>Events for {moment(currentDate).format('dddd, MMMM Do YYYY')}</h2>
        <EventList events={events} currentDate={currentDate} />
        <EventCreateForm />
      </div>
    </>
  );
}

export default HomePage;
