export const newClientAccount = (formValues: any, nextClientNumber: any) => {
  return {
    Name: formValues.ClientName,
    Title: nextClientNumber,
    Client: formValues.CASClient,
    Responsibility_x0020_Centre: formValues.CASResp,
    Service_x0020_Line: formValues.CASServ,
    Project: formValues.CASProj,
    Expense_x0020_Authority_x0020_Na: formValues.CASExpAuth[0].userId,
  };
};
