export const newClientTeam = (formValues: any) => {
  return {
    Title: formValues.ClientName,
    PrimaryContactId: formValues.PrimaryContact[0].userId,
    ApproverId: {
      results: formValues.Approver.map((user: any) => user.userId),
    },
    FinContact: {
      results: formValues.Approver.map((user: any) => user.userId),
    },
  };
};
