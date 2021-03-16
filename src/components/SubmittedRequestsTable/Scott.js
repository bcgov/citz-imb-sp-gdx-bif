import React, { useMemo,useState } from 'react';
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
	const [sortColumBy, setSortColumBy] = useState(false)
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
	}, [query.isFetching,sortColumBy]);

	const tableInstance = useTable({ columns, data, defaultCanSort:true }, useSortBy);

	const handleColumnClick = (ev, column) => {
		console.log('tableInstance :>> ', tableInstance);
		console.log('{ev,column} :>> ', { ev, column });
        setSortColumBy(!sortColumBy)
		const sortedColumn = tableInstance.headerGroups[0].headers.filter((header)=> header.key === column.key)[0]
console.log(`query.data.items.map(item=>item.Title)`, query.data.items.map(item=> item.Title))	};

	return (
		<DetailsList
			items={tableInstance.data}
			columns={tableInstance.columns}
			onColumnHeaderClick={handleColumnClick}
		/>
	);
};
