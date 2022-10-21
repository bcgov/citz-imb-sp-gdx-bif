export const formatNewRequest = (formValues: any, nextClientNumber: any) => {
  return {
    Title: `${formValues.Ministry}-${formValues.Division}`,
    Ministry: formValues.Ministry,
    Division: formValues.Division,
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
      results: formValues.OtherContact.map((user: any) => user.userId),
    },
    ClientTeamName: `${formValues.Ministry}-${formValues.ClientTeamName}`,
  };
};
