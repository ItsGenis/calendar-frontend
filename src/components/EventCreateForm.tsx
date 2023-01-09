import React from 'react';

import { Button, Form } from 'antd';
import { useMutation } from '@apollo/client';
import { EVENT_CREATE } from '../graphql/mutations';
import { GET_EVENTS } from '../graphql/queries';
import EventFormFields from './EventFormFields';
import useNotificationContext from '../providers/notifications/useNotification.hook';

function EventCreateForm() {
  const [eventCreate, { data, loading, error }] = useMutation(EVENT_CREATE, {
    refetchQueries: [{ query: GET_EVENTS }, 'GetEvents'],
  });
  const [form] = Form.useForm();
  const { notifications } = useNotificationContext();

  const onFinish = (values: any) => {
    const variables = {
      title: values.title,
      description: values.description,
      startsAt: values.duration[0],
      endsAt: values.duration[1],
    };

    eventCreate({ variables });
    notifications.success({
      message: `Event ${values.title} created`,
      description: 'Event successfully created',
      placement: 'topLeft',
    });
    form.resetFields();
  };

  const onFinishFailed = () => {
    notifications.error({
      message: 'Event could not be created',
      description: 'Check the form for the errors',
      placement: 'topLeft',
    });
  };

  return (
    <Form
      form={form}
      className='event-create-form'
      layout='inline'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <EventFormFields />

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          {loading ? 'Submitting...' : 'Add Event'}
        </Button>
      </Form.Item>

      {error && `Submission error! ${error.message}`}
    </Form>
  );
}

export default EventCreateForm;
