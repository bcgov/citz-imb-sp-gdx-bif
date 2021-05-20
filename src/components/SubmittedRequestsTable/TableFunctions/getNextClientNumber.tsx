import { GetListItems } from 'components/ApiCalls';

export const getNextClientNumber = async () => {
  const submittedRequestsListItems = await GetListItems({
    listName: 'Submitted Requests',
  });

  if (submittedRequestsListItems.length === 0) {
    const clientAccountsListItems = await GetListItems({
      listName: 'Client Accounts',
    });
    const clientNumbers: Array<number> = clientAccountsListItems.map(
      (item: any) => {
        return parseInt(item.Title);
      }
    );
    return Math.max(...clientNumbers) + 1;
  } else {
    const clientNumbers: Array<number> = submittedRequestsListItems.map(
      (item: any) => {
        return parseInt(item.ClientNumber);
      }
    );

    return Math.max(...clientNumbers) + 1;
  }
};
