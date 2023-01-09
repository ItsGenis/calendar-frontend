import React from 'react';

export type NotificationContextType = {
  notifications: any;
};

const NotificationContext = React.createContext<NotificationContextType>({
  notifications: () => null,
});

export default NotificationContext;
