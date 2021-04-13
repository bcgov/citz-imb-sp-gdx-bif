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
    'Title,Ministry,Division,ClientName,ClientNumber,CASClient,CASResp,CASServ,CASSToB,CASProj,Status,PrimaryContact/Title,PrimaryContactId,Approver/Title,ApproverId,CASExpAuth/Title,CASExpAuthId,OtherContact/Title,OtherContactId,FinContact/Title,FinContactId,Author/Title,AuthorId';

  const items = await GetListItems({
    listName,
    expand,
    select,
  });

  console.log('items :>> ', items);

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
          }
          //@ts-expect-error a previous if statement ensures it's an object
        } else if (listItemProperty.Title) {
          //@ts-expect-error a previous if statement ensures Title is a property
          tempItem[key] = listItemProperty.Title;
        }
      }
    });
    return tempItem;
  });

  return { listInfo: newListInfo, items: filteredData };
};
