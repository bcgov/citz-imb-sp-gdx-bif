import { RestCall } from '../RestCall/RestCall';
import { IAPICallProps } from 'components/ApiCalls/Interfaces';

export const GetListItems = async ({
  listName,
  expand,
  filter,
  select,
  sort = '',
  sortDir = 'Asc',
}: IAPICallProps) => {
  let endPoint = `/_api/web/Lists/getByTitle('${listName}')/items`;

  const endPointParameters = [];
  if (expand) endPointParameters.push(`$expand=${expand}`);
  if (filter) endPointParameters.push(`$filter=${filter}`);
  if (select) endPointParameters.push(`$select=${select}`);
  if (sort) endPointParameters.push(`$sortfield=${sort}&sortdir=${sortDir}`);
  endPointParameters.push('$top=5000');

  if (endPointParameters.length) endPoint += `?${endPointParameters.join('&')}`;

  try {
    const response = await RestCall({ endPoint: endPoint });

    return response.d.results;
  } catch (error) {
    console.error('GetListItems error :>> ', {
      listName,
      expand,
      filter,
      select,
      sort,
      sortDir,
    });
  }
};
