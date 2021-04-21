import { getNextClientNumber } from './TableFunctions';
import { ISubmittedRequestItem } from './Interfaces';
import { creationNotification } from '../Notifications';
import { AddItemsToList } from 'components/ApiCalls';

export const OnSubmit = async (formValues: any, toggleHideDialog: any) => {
  const nextClientNumber = await getNextClientNumber();

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
    Status: formValues.Status,
    ApproverId: {
      results: formValues.Approver.map((user: any) => user.userId),
    },
    PrimaryContactId: formValues.PrimaryContact[0].userId,
    FinContactId: {
      results: formValues.Approver.map((user: any) => user.userId),
    },
    CASExpAuthId: formValues.CASExpAuth[0].userId,
    OtherContactId: {
      results: formValues.Approver.map((user: any) => user.userId),
    },
  };

  toggleHideDialog();
  const listName = 'Submitted Requests';
  if (formValues.Status === 'New') {
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
  }
};
