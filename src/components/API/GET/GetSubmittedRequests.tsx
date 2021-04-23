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

  const expand =
    'Approver,PrimaryContact,CASExpAuth,OtherContact,FinContact,Author';
  const select =
    'Id,Title,Ministry,Division,ClientName,ClientNumber,CASClient,CASResp,CASServ,CASSToB,CASProj,Status,PrimaryContact/Title,PrimaryContact/Name,PrimaryContact/Id,Approver/Title,Approver/Name,Approver/Id,CASExpAuth/Title,CASExpAuth/Name,CASExpAuth/Id,OtherContact/Title,OtherContact/Name,OtherContact/Id,FinContact/Title,FinContact/Name,FinContact/Id,Author/Title,Author/Name,Author/Id';

  const items = await GetListItems({
    listName,
    expand,
    select,
  });

  const filteredData = items.map((listItem: any) => {
    const tempItem: any = { ...listItem };

    Object.entries(listItem).forEach(([key, listItemProperty]) => {
      if (typeof listItemProperty === 'object') {
        //@ts-expect-error previous if statement ensures it's an object
        if (listItemProperty.results) {
          if (key.slice(-2) !== 'Id') {
            //@ts-expect-error a previous if statement ensures results is a property
            tempItem[key] = listItemProperty.results
              .map((person: { Title: string }) => {
                return person.Title;
              })
              .join('; ');
            //@ts-expect-error a previous if statement ensures results is a property
            tempItem[key + 'Name'] = listItemProperty.results
              .map((person: { Name: string }) => {
                return person.Name;
              })
              .join('; ');
          }
          //@ts-expect-error a previous if statement ensures it's an object
        } else if (listItemProperty.Title) {
          //@ts-expect-error a previous if statement ensures Title is a property
          tempItem[key] = listItemProperty.Title;
          //@ts-expect-error a previous if statement ensures Title is a property
          tempItem[key + 'Name'] = listItemProperty.Name;
        }
      }
    });
    return tempItem;
  });
  return { listInfo: newListInfo, items: filteredData };
};
