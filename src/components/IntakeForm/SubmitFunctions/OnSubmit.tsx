import { getNextClientNumber } from '../../SubmittedRequestsTable/TableFunctions';
import { ISubmittedRequestItem } from '../../SubmittedRequestsTable/Interfaces';
import { userToEmail } from '../../Interfaces';
import { getNotificationContent, sendNotification } from '../../Notifications';
import {
  CreateGroup,
  AddItemsToList,
  AddUsersToGroup,
  UpdateListItem,
} from '../../ApiCalls';
import {
  formatNewRequest,
  newClientAccount,
  newClientTeam,
  updateRequest,
} from '../ListItemBodies';

export const OnSubmit = async (
  formValues: any,
  toggleHideDialog: any,
  ListItemEntityTypeFullName: string
) => {
  const nextClientNumber = await getNextClientNumber();

  switch (formValues.Status) {
    case 'New':
      try {
        // AddItemsToList({
        //   listName: 'Submitted Requests',
        //   items: formatNewRequest(formValues, nextClientNumber),
        //   ListItemEntityTypeFullName,
        // });
        sendNotification({
          formValues,
          notificationKey: 'ExpenseAuthority',
          nextClientNumber,
          toField: () => {
            return formValues.CASExpAuth.map((user: userToEmail) => {
              return user.account;
            });
          },
          ccField: [],
        });
      } catch (error) {}
      break;

    case 'Approved':
      try {
        const createGroupResponse = await CreateGroup({
          groupName: `GDX Service Billing - ${nextClientNumber}`,
        });
        await AddUsersToGroup({
          groupId: createGroupResponse.Id,
          loginNames: formValues.TeamNames,
        });
        const newClientTeamResp = await AddItemsToList({
          listName: 'Client Teams',
          items: newClientTeam(formValues),
        });
        //Add to Client Accounts List
        AddItemsToList({
          listName: 'Client Accounts',
          items: newClientAccount(
            formValues,
            nextClientNumber,
            newClientTeamResp[0].d.Id,
            createGroupResponse.Id
          ),
        });

        UpdateListItem({
          listName: 'Submitted Requests',
          items: updateRequest(formValues, 'Approved'),
        });
        sendNotification({
          formValues,
          notificationKey: 'TeamWelcome',
          toField: () => {
            return [
              ...formValues.CASExpAuth,
              ...formValues.Approver,
              ...formValues.FinContact,
              ...formValues.OtherContact,
              ...formValues.PrimaryContact,
            ].map((user: userToEmail) => {
              return user.account;
            });
          },
        }); //team notification
        sendNotification({
          formValues,
          notificationKey: 'GDXApproved',
          toField: () => {
            return ['i:0ǵ.t|bcgovidp|fc9f8c4adca2445f80e247555906c873'];
          },
        }); //GDX notification
      } catch (error) {
        console.log(`error`, error);
      }
      break;
    case 'Rejected':
      try {
        UpdateListItem({
          listName: 'Submitted Requests',
          items: updateRequest(formValues, 'Rejected'),
        });
      } catch (error) {
        console.log(`error`, error);
      }
  }
  toggleHideDialog();
};
