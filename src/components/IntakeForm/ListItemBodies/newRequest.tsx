export const newRequest = (formValues: any, nextClientNumber: any) => {
  return {
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
};
