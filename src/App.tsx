import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SubmittedRequestsTable } from "components";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SubmittedRequestsTable />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
