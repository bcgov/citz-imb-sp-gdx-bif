import { SubmittedRequestsTable } from 'components';
import { GetListItems } from 'components/ApiCalls';
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export const App = () => {
	const [isLoading, setIsLoading] = useState(true);

	const prefetch = async () => {
		await queryClient.prefetchQuery(
			'Config',
			() => GetListItems({ listName: 'Config' }),
			{
				staleTime: 30 * 1000, //30 minutes
				cacheTime: 30 * 1000, //30 minutes
			}
		);
		setIsLoading(false);
	};

	useEffect(() => {
		prefetch();
		return () => {};
	}, []);

  if(isLoading) return <div>loading App...</div>

	return (
		<QueryClientProvider client={queryClient}>
			<SubmittedRequestsTable />

			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
