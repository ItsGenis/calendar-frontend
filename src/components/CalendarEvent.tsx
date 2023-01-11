import React, { useState } from 'react';
import { Event } from '../interfaces/event';
import { Button, Card, Modal } from 'antd';
import { useMutation } from '@apollo/client';
import { EVENT_DELETE } from '../graphql/mutations';
import { GET_EVENTS } from '../graphql/queries';
import EventUpdateForm from './EventUpdateForm';
import dayjs from 'dayjs';
import useNotificationContext from '../providers/notifications/useNotification.hook';

function CalendarEvent({ event }: { event: Event }) {
  const [isEditing, setIsEditing] = useState(false);
  const { id, title, description, startsAt, endsAt } = event;
  const { notifications } = useNotificationContext();

  const [eventDelete, { data, loading, error }] = useMutation(EVENT_DELETE, {
    refetchQueries: [{ query: GET_EVENTS }, 'GetEvents'],
  });

  const onClickDelete = (id: string) => {
    const variables = { id };

    Modal.confirm({
      title: 'Are you sure you want to delete this event?',
      async onOk() {
        await eventDelete({ variables });
        notifications.success({
          message: `Event deleted`,
          description: 'Event successfully deleted',
          placement: 'topLeft',
        });
      },
      onCancel() {
        return null;
      },
    });
  };

  function onSuccessEditing() {
    setIsEditing(false);
  }

  function toggleIsEditing() {
    setIsEditing(!isEditing);
  }

  return (
    <Card
      title={title}
      extra={
        <>
          <Button
            htmlType='button'
            className={isEditing ? 'icon-btn-cross' : 'icon-btn-pencil'}
            onClick={toggleIsEditing}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          <Button
            danger
            htmlType='button'
            className='icon-btn-trash'
            onClick={() => onClickDelete(id)}
          >
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
          <p>Starts on: {dayjs(startsAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
          <p>Ends on: {dayjs(endsAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
        </>
      )}

      {error && `Error on deletion! ${error.message}`}
    </Card>
  );
}

export default CalendarEvent;
