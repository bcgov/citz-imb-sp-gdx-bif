import { GetListItems } from 'components/ApiCalls';

export const getNextClientNumber = async () => {
  const clientNumberListItems = await GetListItems({
    listName: 'Account Number',
  });
  const clientNumbers: Array<number> = clientNumberListItems.map(
    (item: any) => {
      return parseInt(item.number);
    }
  );

  return Math.max(...clientNumbers) + 1;
};
