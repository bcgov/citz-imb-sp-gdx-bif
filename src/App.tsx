import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SubmittedRequestsTable } from "components";
import { PeoplePicker } from "./components/IntakeForm/Inputs/PeoplePicker";
const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SubmittedRequestsTable />
      <h1>Custom PeoplePicker</h1>
      <PeoplePicker />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
