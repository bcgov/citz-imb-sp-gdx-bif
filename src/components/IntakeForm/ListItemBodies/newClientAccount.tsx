export const newClientAccount = (
  formValues: any,
  clientTeamLookupId: number,
  createGroupResponseId: number
) => {
  return {
    Name: formValues.ClientTeamName,
    Title: formValues.ClientNumber.toString(),
    Client: formValues.CASClient,
    Client_x0020_TeamId: clientTeamLookupId,
    Responsibility_x0020_Centre: formValues.CASResp,
    Service_x0020_Line: formValues.CASServ,
    Project: formValues.CASProj,
    STOB: formValues.CASSToB,
    Expense_x0020_Authority_x0020_Na: formValues.CASExpAuth,
    permissionGroupId: createGroupResponseId,
  };
};
