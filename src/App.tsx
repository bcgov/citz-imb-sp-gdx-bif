import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SubmittedRequestsTable } from "components";
const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SubmittedRequestsTable />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
