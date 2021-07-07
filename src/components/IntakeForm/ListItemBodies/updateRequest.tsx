export const updateRequest = (formValues: any, status: string) => {
  return [
    {
      Status: status,
      Id: formValues.Id,
    },
  ];
};
