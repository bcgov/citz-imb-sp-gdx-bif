import { useMemo } from 'react';

export const Data = (query: any) => {
  return useMemo(() => {
    if (query.isLoading || query.isError) return [];

    return query.data.items;
  }, [query.isLoading, query.isError, query.data?.items]);
};
