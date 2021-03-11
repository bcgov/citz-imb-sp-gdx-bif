import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MyTest } from "components/test";
import { DetailsListBasicExample } from "components/DetailsList/DetailsList";
import { TestDetailsList } from "components/DetailsList/TestDetailList";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <MyTest /> */}
      <TestDetailsList />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <DetailsListBasicExample /> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
