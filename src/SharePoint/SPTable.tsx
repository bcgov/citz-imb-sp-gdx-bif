import React from 'react'
import { useQuery } from 'react-query'
import { TableLayout } from './TableLayout/TableLayout'

interface SPTableProps {
	listName: string
	apiCall: any
}

export const SPTable = ({ listName, apiCall }: SPTableProps) => {
	const tableQuery = useQuery(listName, apiCall)
	console.log('tableQuery :>> ', tableQuery)
	const { isFetching, data, isLoading } = tableQuery

	const columns = data as Object

	console.log('columns :>> ', columns);
	//@ts-ignore
	if (isLoading) return <div>loading...</div>

	return (
		<TableLayout
			title={'test'}
			isFetching={isFetching}
			//@ts-ignore
			columns={columns.listInfo.Columns}
			data={[]}
		/>
	)
}
