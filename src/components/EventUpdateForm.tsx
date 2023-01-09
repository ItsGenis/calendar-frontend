import React from 'react';
import { Event } from '../interfaces/event';
import { Button, Form } from 'antd';
import { useMutation } from '@apollo/client';
import { EVENT_UPDATE } from '../graphql/mutations';
import { GET_EVENTS } from '../graphql/queries';
import EventFormFields from './EventFormFields';
import dayjs from 'dayjs';
import useNotificationContext from '../providers/notifications/useNotification.hook';

function EventUpdateForm({
  event,
  onSuccessEditing,
}: {
  event: Event;
  onSuccessEditing: () => void;
}) {
  const { id, title, description, startsAt, endsAt } = event;
  const { notifications } = useNotificationContext();
  const [eventUpdate, { data, loading, error }] = useMutation(EVENT_UPDATE, {
    refetchQueries: [{ query: GET_EVENTS }, 'GetEvents'],
  });

  function onFinish(values: any) {
    const variables = {
      id,
      title: values.title,
      description: values.description,
      startsAt: values.duration[0],
      endsAt: values.duration[1],
    };

    eventUpdate({ variables });
    notifications.success({
      message: `Event ${values.title} updated`,
      description: 'Event successfully updated',
      placement: 'topLeft',
    });
    onSuccessEditing();
  }

  const onFinishFailed = () => {
    notifications.error({
      message: 'Event could not be updated',
      description: 'Check the form for the errors',
      placement: 'topLeft',
    });
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        title,
        description,
        duration: [dayjs(startsAt), dayjs(endsAt)],
      }}
      autoComplete='off'
    >
      <EventFormFields />

      <Form.Item wrapperCol={{ offset: 2, span: 4 }}>
        <Button type='primary' htmlType='submit'>
          {loading ? 'Submitting...' : 'Save Event'}
        </Button>
      </Form.Item>

      {error && `Submission error! ${error.message}`}
    </Form>
  );
}

export default EventUpdateForm;
