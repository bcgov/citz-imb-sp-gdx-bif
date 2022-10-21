export const updateAccountNumber = (nextClientNumber: number) => {
  return [
    {
      number: nextClientNumber++,
      Id: 1,
    },
  ];
};
