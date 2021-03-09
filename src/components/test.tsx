import React from 'react'
import { GetSubmittedRequests } from 'components'
import { useQuery } from 'react-query'

export const MyTest = () => {
	const options = {
		listName: 'SubmittedRequests',
		apiCall: GetSubmittedRequests,
	}

	const tableQuery = useQuery(options.listName, options.apiCall)
	console.log('tableQuery :>> ', tableQuery)
	//@ts-ignore
	return <div>hello</div>
}
