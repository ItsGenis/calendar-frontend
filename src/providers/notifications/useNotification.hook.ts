import { useContext } from 'react';
import NotificationContext from './Notification.context';

export default function useNotificationContext() {
  return useContext(NotificationContext);
}
