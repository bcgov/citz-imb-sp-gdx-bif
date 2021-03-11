import React from 'react';
import { GetSubmittedRequests, GetMinistryAcronyms } from 'components';
import {useQuery} from 'react-query'

export const MyTest = () => {
	const myList = useQuery('MinistryAcronyms', GetMinistryAcronyms);

	console.log('myList :>> ', myList);

	return <div>{myList.status}</div>;
};
