import { getNextClientNumber , AddItemMutation } from './TableFunctions';
import { ISubmittedRequestItem } from './Interfaces';

import { useNotification } from '../Hooks';

export const OnSubmit = (value: any, toggleHideDialog: any): void => {
  const { sendRequestForApprovalEmail } = useNotification();
  const nextClientNumber = getNextClientNumber();

  const newItem: ISubmittedRequestItem = {
    Title: `${value.Ministry}-${nextClientNumber}`,
    Ministry: value.Ministry,
    Division: value.Division,
    ClientName: value.ClientName,
    ClientNumber: nextClientNumber,
    CASClient: value.CASClient,
    CASResp: value.CASResp,
    CASServ: value.CASServ,
    CASSToB: value.CASSToB,
    CASProj: value.CASProj,
    Status: value.Status,
    ApproverId: {
      results: value.Approver.map((user: any) => user.userId),
    },
    PrimaryContactId: value.PrimaryContact[0].userId,
    FinContactId: {
      results: value.Approver.map((user: any) => user.userId),
    },
    CASExpAuthId: value.CASExpAuth[0].userId,
    OtherContactId: {
      results: value.Approver.map((user: any) => user.userId),
    },
  };

  toggleHideDialog();
  AddItemMutation().mutateAsync(newItem, {
    onSuccess: () => {
      sendRequestForApprovalEmail(newItem.CASExpAuthId);
    },
  });
};
