import { GetListItems, GetList } from 'components/ApiCalls';

export const GetMinistryAcronyms = async () => {
  const listName = 'Ministry Acronyms';
  const listInfo = await GetList({ listName });
  const items = await GetListItems({ listName });

  return { listInfo, items };
};
