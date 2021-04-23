import { GetListItems } from '../ApiCalls';

export const getNotificationContent = async () => {
  const notifications = await GetListItems({
    listName: 'NotificationsConfig',
  });
  const GDXNotification = () => {
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].key === 'GDXApproved') {
        return {
          subject: notifications[i].subject,
          body: notifications[i].body,
        };
      }
    }
  };
  const TeamNotification = () => {
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].key === 'TeamWelcome') {
        return {
          subject: notifications[i].subject,
          body: notifications[i].body,
        };
      }
    }
  };

  return [TeamNotification(), GDXNotification()];
};
