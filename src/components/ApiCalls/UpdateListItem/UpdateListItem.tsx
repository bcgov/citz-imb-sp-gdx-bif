import { RestCall } from '../RestCall/RestCall';
import { GetList } from '../GetList/GetList';
import { IUpdateListItem } from '../../Interfaces';

export const UpdateListItem = async ({
  listName,
  listGUID,
  items,
}: IUpdateListItem) => {
  let endPoint: string;

  if (!Array.isArray(items)) items = [items];

  if (listGUID) {
    endPoint = `/_api/web/Lists('${listGUID}')/items`;
  } else if (listName) {
    endPoint = `/_api/web/Lists/getByTitle('${listName}')/items`;
  } else {
    console.log('error, missing listname or GUID for UpdateListItem');
  }

  const listResponse = await GetList({ listName, listGUID });

  const responses: any = [];

  items.forEach(async (item: any) => {
    const tempItem: any = {
      ...item,
      __metadata: { type: listResponse.ListItemEntityTypeFullName },
    };
    console.log(`tempItem`, tempItem);
    console.log(`URL:   ${endPoint}(${tempItem.Id})`);
    const response = await RestCall({
      endPoint: `${endPoint}(${tempItem.Id})`,
      method: 'merge',
      body: tempItem,
    });

    responses.push(response);
  });

  return responses;
};
