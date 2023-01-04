import React, { useState } from 'react';
import moment from 'moment';
import { Event } from '../interfaces/event';
import { Button, Card } from 'antd';
import { useMutation } from '@apollo/client';
import { EVENT_DELETE } from '../graphql/mutations';
import { GET_EVENTS } from '../graphql/queries';
import EventUpdateForm from './EventUpdateForm';

function CalendarEvent({ event }: { event: Event }) {
  const [isEditing, setIsEditing] = useState(false);
  const { id, title, description, startsAt, endsAt } = event;

  const [eventDelete, { data, loading, error }] = useMutation(EVENT_DELETE, {
    refetchQueries: [{ query: GET_EVENTS }, 'GetEvents'],
  });

  function onClickDelete(id: string) {
    const variables = { id };
    eventDelete({ variables });
  }

  function onSuccessEditing() {
    setIsEditing(false);
  }

  return (
    <Card
      title={title}
      extra={
        <>
          {isEditing || (
            <Button htmlType='button' onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
          <Button htmlType='button' onClick={() => onClickDelete(id)}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </>
      }
    >
      {isEditing ? (
        <EventUpdateForm event={event} onSuccessEditing={onSuccessEditing} />
      ) : (
        <>
          <p>{description}</p>
          <p>Starts on: {moment(startsAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
          <p>Ends on: {moment(endsAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
        </>
      )}

      {error && `Error on deletion! ${error.message}`}
    </Card>
  );
}

export default CalendarEvent;
