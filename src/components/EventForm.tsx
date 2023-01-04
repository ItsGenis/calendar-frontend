import React from 'react';

import { Button, Form, Input, DatePicker } from 'antd'
import { gql, useMutation } from '@apollo/client';
import { EVENT_CREATE } from '../graphql/mutations';
import { GET_EVENTS } from '../graphql/queries';

function EventForm() {
  const [eventCreate, { data, loading, error }] = useMutation(EVENT_CREATE, {
    refetchQueries: [
      { query: GET_EVENTS },
      'GetEvents'
    ],
  });


  const onFinish = (values: any) => {
    const variables = {
      title: values.title,
      description: values.description,
      startsAt: values.duration[0],
      endsAt: values.duration[1]
    };

    eventCreate({ variables });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 4 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Event Title" name="title">
        <Input />
      </Form.Item>

      <Form.Item label="Event Description" name="description">
        <Input />
      </Form.Item>

      <Form.Item label="Event Duration" name="duration">
        <DatePicker.RangePicker showTime />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 2, span: 4 }}>
        <Button type="primary" htmlType="submit">
          Add Event
        </Button>
      </Form.Item>

      {loading && 'Submitting...'}
      {error && `Submission error! ${error.message}`}
    </Form>
  );
}

export default EventForm;
