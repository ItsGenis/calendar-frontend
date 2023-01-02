import { gql, useQuery } from '@apollo/client';
import React from 'react';
import './App.css';

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

function DisplayEvents() {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.events.map(({ id, title, description, startsAt, endsAt }: Event) => (
    <div key={id}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{startsAt.toString()}</p>
      <p>{endsAt.toString()}</p>
      <br />
    </div>
  ));
}

function App() {
  return (
    <div>
      <h2>Events</h2>
      <DisplayEvents />
    </div>
  );
}

export default App;
