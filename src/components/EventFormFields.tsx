import React from 'react';
import { DatePicker, Form, Input } from 'antd';

function EventFormFields() {
  return (
    <>
      <Form.Item
        label='Event Title'
        name='title'
        rules={[{ required: true, message: 'Please enter a title for this event.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Event Description'
        name='description'
        rules={[{ required: true, message: 'Please enter a description for this event.' }]}
      >
        <Input.TextArea rows={1} />
      </Form.Item>

      <Form.Item
        label='Event Duration'
        name='duration'
        rules={[{ required: true, message: 'Please select a date range for this event.' }]}
      >
        <DatePicker.RangePicker showTime />
      </Form.Item>
    </>
  );
}

export default EventFormFields;
