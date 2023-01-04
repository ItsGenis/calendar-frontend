import React from 'react';

import { Button, Form, Input, DatePicker } from 'antd'

function EventForm() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 4 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Event Name" name="name">
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
    </Form>
  );
}

export default EventForm;
