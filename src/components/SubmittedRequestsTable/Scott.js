import React, { useMemo } from 'react';
import { GetSubmittedRequests } from 'components/API/GET/GetSubmittedRequests';
import { GetColumns } from 'components/API/GET/GetColumns';
import { useQuery } from 'react-query';
import { useTable, useSortBy } from 'react-table';
import { DetailsList } from '@fluentui/react';

const transformData = (items) => {
	console.log('items :>> ', items);

	return items;
};

export const Scott = () => {
	const query = useQuery('scott', GetSubmittedRequests);

	const data = useMemo(() => {
		if (query.isLoading || query.isError) return [];
		return transformData(query.data.items);
	}, [query.isFetching]);

	const columns = useMemo(() => {
		if (query.isLoading || query.isError) return [];

		return GetColumns(
			query.data.listInfo.Columns,
			query.data.listInfo.Fields.results
		);
	}, [query.isFetching]);

	const tableInstance = useTable({ columns, data }, useSortBy);

	const handleColumnClick = (ev, column) => {
		console.log('tableInstance :>> ', tableInstance);
		console.log('{ev,column} :>> ', { ev, column });
	};

	return (
		<DetailsList
			items={tableInstance.data}
			columns={tableInstance.columns}
			onColumnClick={handleColumnClick}
		/>
	);
};
