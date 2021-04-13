import { GetColumns } from 'components/API/GET/GetColumns';

export const columns = (query: any) => {
  if (query.isLoading || query.isError) return [];

  const tempColumns = GetColumns(
    query.data.listInfo.Columns,
    query.data.listInfo.Fields.results
  );

  return tempColumns;
};
