import { RestCall } from '../RestCall/RestCall';
import { GetList } from '../GetList/GetList';
import { IAddItemsToList } from '../../Interfaces';
export const AddItemsToList = async ({
  listName,
  items,
  ListItemEntityTypeFullName,
}: IAddItemsToList) => {
  let list;
  if (!Array.isArray(items)) items = [items];

  if (ListItemEntityTypeFullName) {
    list = { ListItemEntityTypeFullName };
  } else {
    list = await GetList({ listName });
  }

  const endPoint = `/_api/web/Lists/getByTitle('${listName}')/items`;

  const responses = [];

  for (let i = 0; i < items.length; i++) {
    items[i].__metadata = {
      type: list.ListItemEntityTypeFullName,
    };
    const response = await RestCall({
      endPoint: endPoint,
      method: 'post',
      body: items[i],
    });
    responses.push(response);
  }

  return responses;
};
