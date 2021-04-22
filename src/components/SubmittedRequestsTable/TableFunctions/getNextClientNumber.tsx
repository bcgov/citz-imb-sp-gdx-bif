import { GetListItems } from 'components/ApiCalls';

export const getNextClientNumber = async () => {
  const listName = 'Client Accounts';

  const listItems = await GetListItems({ listName });

  const clientNumbers: Array<number> = listItems.map((item: any) => {
    return parseInt(item.Title);
  });

  return Math.max(...clientNumbers) + 1;
};
