import React from 'react'
// import { useQueryClient } from 'react-query'
import { useMinistryAcronyms } from './hooks/useMinistryAcronyms/useMinistryAcronyms'

export const MyTest = () => {
	// const queryClient = useQueryClient()
	const ministryAcronyms = useMinistryAcronyms()

	console.log('ministryAcronyms :>> ', ministryAcronyms);

	return <div>hello world</div>
}
