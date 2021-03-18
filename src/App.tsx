import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SubmittedRequestsTable } from 'components';
import { Scott } from './components/SubmittedRequestsTable/Scott.js';
const queryClient = new QueryClient();

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Scott />
			{/* <SubmittedRequestsTable />
      <br />
      <br />
      <br />
      <br />
      <br /> */}
      <ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
