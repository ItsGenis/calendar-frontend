import { gql, useQuery } from "@apollo/client";
import moment from 'moment';
import React from 'react';

interface Event {
  id: string,
  title: string,
  description: string,
  startsAt: Date,
  endsAt: Date
}

const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      description
      startsAt
      endsAt
    }
  }
`;

function EventList({ currentDate }: { currentDate: Date }) {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.events
    .filter((event: Event) => moment(currentDate).isBetween(event.startsAt, event.endsAt))
    .map(({ id, title, description, startsAt, endsAt }: Event) => (
      <div key={id}>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{startsAt.toString()}</p>
        <p>{endsAt.toString()}</p>
      </div>
    ));
}

export default EventList;
