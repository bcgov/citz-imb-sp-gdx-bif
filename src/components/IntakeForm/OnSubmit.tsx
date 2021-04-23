import { getNextClientNumber } from '../SubmittedRequestsTable/TableFunctions';
import { ISubmittedRequestItem } from '../SubmittedRequestsTable/Interfaces';
import {
  creationNotification,
  getNotificationContent,
  sendNotification,
} from '../Notifications';
import { AddItemsToList, AddUsersToGroup } from 'components/ApiCalls';
import { CreateGroup, GetGroupMembers, GetListItems } from '../ApiCalls';

export const OnSubmit = async (formValues: any, toggleHideDialog: any) => {
  toggleHideDialog();
  const listName = 'Submitted Requests';
  const nextClientNumber = await getNextClientNumber();
  if (formValues.Status === 'New') {
    const newItem: any = {
      Title: `${formValues.Ministry}-${nextClientNumber}`,
      Ministry: formValues.Ministry,
      Division: formValues.Division,
      ClientName: formValues.ClientName,
      ClientNumber: nextClientNumber,
      CASClient: formValues.CASClient,
      CASResp: formValues.CASResp,
      CASServ: formValues.CASServ,
      CASSToB: formValues.CASSToB,
      CASProj: formValues.CASProj,
      ApproverId: {
        results: formValues.Approver.map((user: any) => user.userId),
      },
      PrimaryContactId: formValues.PrimaryContact[0].userId,
      FinContactId: {
        results: formValues.FinContact.map((user: any) => user.userId),
      },
      CASExpAuthId: formValues.CASExpAuth[0].userId,
      OtherContactId: {
        results: formValues.Approver.map((user: any) => user.userId),
      },
    };

    try {
      Promise.all([
        AddItemsToList({
          listName,
          items: newItem,
        }),
      ]).then(() => {
        creationNotification(formValues.CASExpAuth[0].userId);
      });
    } catch (error) {
      console.log(`error`, error);
    }
  } else if (formValues.Status === 'Submitted') {
    try {
      Promise.all([
        // const createGroupResponse = await CreateGroup({
        //   groupName: `GDX Service Billing - ${nextClientNumber}`,
        // });
      ])
        .then(() => {
          // await AddUsersToGroup({
          //   groupId: createGroupResponse.Id,
          //   loginNames: formValues.TeamNames,
          // });
        })
        .then(async () => {
          const allNotifications = await getNotificationContent();
          console.log(`allNotifications`, allNotifications);
          // Promise.all([
          //   sendNotification(formValues)
          //   sendNotification(formValues)
          // ])
          console.log(`formValues`, formValues);
        });
    } catch (error) {
      console.log(`error`, error);
    }

    // const createGroupResponse = await CreateGroup({
    //   groupName: `GDX Service Billing - ${nextClientNumber}`,
    // });
    // await AddUsersToGroup({
    //   groupId: createGroupResponse.Id,
    //   loginNames: formValues.TeamNames,
    // });
    // console.log(`createGroupResponse`, createGroupResponse);
    //GDX Service Billing Owners
    // approvedNotifications(formValues.TeamNames);
  }
};
