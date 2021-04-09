import { RestCall } from '../RestCall/RestCall';

interface GetListProps {
  baseurl?: string;
  listName?: string;
  listGUID?: string;
  expand?: string;
  filter?: string;
  select?: string;
}

export const GetList = async ({
  baseurl = '',
  listName,
  listGUID,
  expand = 'Fields',
  filter = '',
  select = '',
}: GetListProps) => {
  if (!listName && !listGUID) throw 'GetList requires listGUID or listName';

  let endPoint = '';
  let endPointParameters = `?$expand=FirstUniqueAncestorSecurableObject,RootFolder`;

  if (expand) endPointParameters += `,${expand}`;
  if (filter) endPointParameters += `&$filter=${filter}`;
  if (select) endPointParameters += `&$select=${select}`;

  if (listGUID) {
    endPoint = `/_api/web/Lists('${listGUID}')${endPointParameters}`;
  } else {
    endPoint = `/_api/web/Lists/getByTitle('${listName}')${endPointParameters}`;
  }

  const response = await RestCall({ url: baseurl, endPoint: endPoint });

  return response.d;
};
