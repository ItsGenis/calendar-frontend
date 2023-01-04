import React from 'react';
import moment from 'moment';
import { Event } from '../interfaces/event';
import { Button, DatePicker, Form, Input } from 'antd';
import { useMutation } from '@apollo/client';
import { EVENT_UPDATE } from '../graphql/mutations';
import { GET_EVENTS } from '../graphql/queries';

function EventUpdateForm({
  event,
  onSuccessEditing,
}: {
  event: Event;
  onSuccessEditing: Function;
}) {
  const { id, title, description, startsAt, endsAt } = event;

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
    onSuccessEditing();
  }

  function onFinishFailed() {}

  return (
    <Form
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 4 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        title,
        description,
        duration: [moment(startsAt), moment(endsAt)],
      }}
      autoComplete='off'
    >
      <Form.Item label='Event Title' name='title'>
        <Input />
      </Form.Item>

      <Form.Item label='Event Description' name='description'>
        <Input.TextArea />
      </Form.Item>

      <Form.Item label='Event Duration' name='duration'>
        <DatePicker.RangePicker showTime />
      </Form.Item>

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
