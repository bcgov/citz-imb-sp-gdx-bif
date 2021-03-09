import React from 'react'
import { GetSubmittedRequests } from 'components'
import { SPTable } from 'components'

export const MyTest = () => {
	const options = {
		listName: 'SubmittedRequests',
		apiCall: GetSubmittedRequests,
	}

	return <SPTable {...options} />
}
