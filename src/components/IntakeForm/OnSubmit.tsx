import { getNextClientNumber } from '../SubmittedRequestsTable/TableFunctions';
import { ISubmittedRequestItem } from '../SubmittedRequestsTable/Interfaces';
import {
  creationNotification,
  getNotificationContent,
  sendNotification,
} from '../Notifications';
import {
  CreateGroup,
  GetGroupMembers,
  GetListItems,
  AddItemsToList,
  AddUsersToGroup,
} from '../ApiCalls';
import { newRequest, newClientAccount, newClientTeam } from './ListItemBodies';

export const OnSubmit = async (formValues: any, toggleHideDialog: any) => {
  toggleHideDialog();
  const nextClientNumber = await getNextClientNumber();
  const allNotifications = await getNotificationContent();

  if (formValues.Status === 'New') {
    try {
      AddItemsToList({
        listName: 'Submitted Requests',
        items: newRequest(formValues, nextClientNumber),
      });
      sendNotification(formValues);
    } catch (error) {
      console.log(`error`, error);
    }
  } else if (formValues.Status === 'Submitted') {
    console.log(`formValues`, formValues);
    try {
      const createGroupResponse = await CreateGroup({
        groupName: `GDX Service Billing - ${nextClientNumber}`,
      });
      await AddUsersToGroup({
        groupId: createGroupResponse.Id,
        loginNames: formValues.TeamNames,
      });
      //Add to Client Accounts List
      AddItemsToList({
        listName: 'Client Accounts',
        items: newClientAccount(formValues, nextClientNumber),
      });
      //Add to Client Teams List
      AddItemsToList({
        listName: 'Client Teams',
        items: newClientTeam(formValues),
      });

      sendNotification(formValues); //team notification
      // sendNotification(formValues); //GDX notification
    } catch (error) {
      console.log(`error`, error);
    }
  }
};
