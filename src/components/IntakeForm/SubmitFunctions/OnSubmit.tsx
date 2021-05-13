import { getNextClientNumber } from '../../SubmittedRequestsTable/TableFunctions';
import { ISubmittedRequestItem } from '../../SubmittedRequestsTable/Interfaces';
import { userToEmail } from '../../Interfaces';
import { getNotificationContent, sendNotification } from '../../Notifications';
import { MessageBar, MessageBarType } from '@fluentui/react';
import {
  GetGroupMembers,
  CreateGroup,
  AddItemsToList,
  AddUsersToGroup,
  UpdateListItem,
  ChangeGroupOwner,
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
  const GDXGroupMembers = await GetGroupMembers({
    groupName: 'GDX Service Billing Owners',
  });
  switch (formValues.Status) {
    case 'New':
      try {
        AddItemsToList({
          listName: 'Submitted Requests',
          items: formatNewRequest(formValues, nextClientNumber),
          ListItemEntityTypeFullName,
        });

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
          allowMembersEditMembership: true,
        });

        AddUsersToGroup({
          groupId: createGroupResponse.Id,
          loginNames: formValues.TeamNames,
        });

        ChangeGroupOwner({
          groupIdentifier: createGroupResponse.Id,
          ownerIdentifier: 'GDX Service Billing Owners',
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
          toField: () =>
            formValues.TeamNames.filter(
              (item: string, index: string) =>
                formValues.TeamNames.indexOf(item) === index
            ),
        });

        //team notification
        sendNotification({
          formValues,
          notificationKey: 'GDXApproved',
          toField: () => {
            return GDXGroupMembers.map((member: { LoginName: string }) => {
              return member.LoginName;
            });
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
