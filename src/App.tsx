import { SubmittedRequests } from 'components';
import { GetListItems, GetCurrentUser } from 'components/ApiCalls';
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ProgressIndicator } from '@fluentui/react';
import './app.css';
const queryClient = new QueryClient();

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const prefetch = async () => {
    await queryClient.prefetchQuery(
      'Email Details',
      () =>
        GetListItems({
          listName: 'Email Details',
          select:
            'Title,Key,Subject,Body,ContactUserId,ContactUser,ContactUser/Title',
          expand: 'ContactUser',
        }),
      {
        staleTime: 30 * 60 * 1000, //30 minutes
        cacheTime: 30 * 60 * 1000, //30 minutes
      }
    );
    await queryClient.prefetchQuery(
      'CurrentUser',
      () => GetCurrentUser('GDX Service Billing Owners'),
      {
        staleTime: 30 * 60 * 1000, //30 minutes
        cacheTime: 30 * 60 * 1000, //30 minutes
      }
    );

    setIsLoading(false);
  };

  useEffect(() => {
    prefetch();
  }, []);

  if (isLoading)
    return (
      <ProgressIndicator label={'loading App'} description={'Please Wait...'} />
    );

  return (
    <QueryClientProvider client={queryClient}>
      <SubmittedRequests />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
