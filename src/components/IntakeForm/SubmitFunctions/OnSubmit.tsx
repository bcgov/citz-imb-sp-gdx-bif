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
  ListItemEntityTypeFullName: string
) => {
  const nextClientNumber = await getNextClientNumber();

  const GDXGroupMembers = await GetGroupMembers({
    groupName: 'GDX Service Billing Owners',
  });
  switch (formValues.Status) {
    case 'New':
      try {
        const AddItemsToListResponse = await AddItemsToList({
          listName: 'Submitted Requests',
          items: formatNewRequest(formValues, nextClientNumber),
          ListItemEntityTypeFullName,
        });
        sendNotification({
          formValues,
          notificationKey: 'ExpenseAuthority',
          toField: () => {
            return formValues.CASExpAuth[0].account;
          },
          newSubmissionId: AddItemsToListResponse[0].d.ID,
          clientNumber: AddItemsToListResponse[0].d.ClientNumber,
        });
      } catch (error) {}
      break;

    case 'Approved':
      try {
        console.log(`formValues.TeamNames`, formValues.TeamNames);
        const createGroupResponse = await CreateGroup({
          groupName: `Service Billing - ${formValues.ClientNumber}`,
          allowMembersEditMembership: true,
        });
        AddUsersToGroup({
          groupId: createGroupResponse.Id,
          loginNames: formValues.TeamNames,
        });
        try {
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
              newClientTeamResp[0].d.ID,
              createGroupResponse.Id
            ),
          });
          console.log(`formValues on submit`, formValues);
          UpdateListItem({
            listName: 'Submitted Requests',
            items: updateRequest(formValues, 'Approved'),
          });

          // team notification
          sendNotification({
            formValues,
            notificationKey: 'TeamWelcome',
            toField: () =>
              formValues.TeamNames.filter(
                (item: string, index: string) =>
                  formValues.TeamNames.indexOf(item) === index
              ),
            newSubmissionId: formValues.ID,
            clientNumber: formValues.ClientNumber,
          });
          //GDX notification
          sendNotification({
            formValues,
            notificationKey: 'GDXApproved',
            toField: () => {
              return GDXGroupMembers.map((member: { LoginName: string }) => {
                return member.LoginName;
              });
            },
            newSubmissionId: formValues.ID,
            clientNumber: formValues.ClientNumber,
          });
        } catch (error) {
          console.log(`error`, error);
        }
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
};
