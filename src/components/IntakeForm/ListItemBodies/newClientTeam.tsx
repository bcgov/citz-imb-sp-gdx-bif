export const newClientTeam = (formValues: any) => {
  return {
    Title: formValues.Title,
    PrimaryContactId: formValues.PrimaryContactId,
    ApproverId: {
      results: formValues.ApproverId.map((id: any) => id),
    },
    FinContactId: {
      results: formValues.FinContactId.map((id: any) => id),
    },
  };
};
