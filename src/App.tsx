import React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { MyTest } from './components/test'

const queryClient = new QueryClient()

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<MyTest />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
