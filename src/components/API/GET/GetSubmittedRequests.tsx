import { GetListItems, GetList } from 'components/ApiCalls';

export const GetSubmittedRequests = async () => {
  const listName = 'Submitted Requests';
  const listInfo = await GetList({
    listName,
    expand: 'DefaultView,DefaultView/ViewFields,Fields',
  });

  const newListInfo = {
    ...listInfo,
    Columns: listInfo.DefaultView.ViewFields.Items.results,
  };
  const items = await GetListItems({ listName });

  return { listInfo: newListInfo, items };
};
