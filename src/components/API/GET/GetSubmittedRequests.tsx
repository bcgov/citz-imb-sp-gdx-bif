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
    'Id,Title,Ministry,Division,ClientNumber,ClientTeamName,CASClient,CASResp,CASServ,CASSToB,CASProj,Status,PrimaryContact/Title,PrimaryContact/Name,PrimaryContact/Id,Approver/Title,Approver/Name,Approver/Id,CASExpAuth/Title,CASExpAuth/Name,CASExpAuth/Id,OtherContact/Title,OtherContact/Name,OtherContact/Id,FinContact/Title,FinContact/Name,FinContact/Id,Author/Title,Author/Name,Author/Id';

  const items = await GetListItems({
    listName,
    expand,
    select,
  });
  console.log(`items`, items);
  const filteredData = items.map((listItem: any) => {
    const tempItem: any = { ...listItem };

    Object.entries(listItem).forEach(
      ([key, listItemProperty]: [string, any]) => {
        if (typeof listItemProperty === 'object') {
          if (listItemProperty.__deferred) {
            tempItem[key] = null;
          } else {
            if (listItemProperty.results) {
              tempItem[key] = listItemProperty.results
                .map((person: { Title: string }) => {
                  return person.Title;
                })
                .join('; ');
              tempItem[key + 'Name'] = listItemProperty.results
                .map((person: { Name: string }) => {
                  return person.Name;
                })
                .join('; ');
              tempItem[key + 'Id'] = listItemProperty.results.map(
                (person: { Id: string }) => {
                  return person.Id;
                }
              );
            } else if (listItemProperty.Title) {
              tempItem[key] = listItemProperty.Title;
              tempItem[key + 'Name'] = listItemProperty.Name;
              tempItem[key + 'Id'] = listItemProperty.Id;
            }
          }
        }
      }
    );
    console.log(`tempItem`, tempItem);
    return tempItem;
  });

  return { listInfo: newListInfo, items: filteredData };
};
