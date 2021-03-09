import React from 'react'
import { GetMinistryAcronyms } from 'components'
import { useQuery } from 'react-query'

export const MyTest = () => {
	const options = {
		listName: 'MinistryAcronyms',
		apiCall: GetMinistryAcronyms,
	}

	const tableQuery = useQuery(options.listName, options.apiCall)
	console.log('tableQuery :>> ', tableQuery)
	//@ts-ignore
	return <div>hello</div>
}
