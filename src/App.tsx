import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SubmittedRequestsTable } from "components";
import { PeoplePicker } from "./components/IntakeForm/Inputs/PeoplePicker";
import { PeoplePickerNormalExample } from "components/IntakeForm/Inputs/PeoplePickerNormalExample";
const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SubmittedRequestsTable />
      <h1>Custom PeoplePicker</h1>
      <PeoplePicker />
      <h1>MS Example</h1>
      <PeoplePickerNormalExample />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
