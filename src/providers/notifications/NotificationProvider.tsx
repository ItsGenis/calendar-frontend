import { notification } from 'antd';
import React, { useCallback } from 'react';
import NotificationContext from './Notification.context';

export default function NotificationContextProvider({ children }: { children: React.ReactNode }) {
  const [api, contextHolder] = notification.useNotification();

  const contextValue = {
    notifications: api,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}
