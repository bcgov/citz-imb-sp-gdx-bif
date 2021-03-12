import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Table } from "components/Table/Table";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Table />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
