import { GetListItems } from 'components/ApiCalls';

export const getNextClientNumber = async () => {
  const listName = 'Client Accounts';

  const listItems = await GetListItems({ listName });

  const clientNumbers: Array<number> = listItems.map((item: any) => {
    return item.ClientNumber;
  });

  return Math.max(...clientNumbers) + 1;
};
