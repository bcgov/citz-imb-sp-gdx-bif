import React, { ReactNode } from 'react'
import {
	AppBar,
	CircularProgress,
	Toolbar,
	Typography,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableSortLabel,
	TablePagination,
} from '@material-ui/core'
import { useTable, useFilters, useSortBy, usePagination } from 'react-table'

interface TableLayoutProps {
	title: string
	isFetching: boolean
	tableActions?: Array<ReactNode>
	columns: Array<any>
	data: Array<any>
	initialState?: Object
}

export const TableLayout = ({
	title,
	isFetching,
	tableActions = [],
	columns,
	data,
	initialState = {},
}: TableLayoutProps) => {
	// const table = useTable(
	// 	{ columns, data, initialState },
	// 	useFilters,
	// 	useSortBy,
	// 	usePagination
	// )

	return (
		<>
					</>
	)
}
