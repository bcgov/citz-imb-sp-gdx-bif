import React from 'react';
import { SubmittedRequestsTable } from 'components/SubmittedRequestsTable';
import { FormDialog } from 'components/FormDialog';
import { IntakeForm } from 'components/IntakeForm';
import { useBoolean } from '@fluentui/react-hooks';
import { useQuery } from 'react-query';
import { GetSubmittedRequests } from 'components/API/GET/GetSubmittedRequests';
import { Columns, Data, TableInstance } from '../SubmittedRequestsTable';
//!because React-Table is not properly typed
// import { QuerySuccessResult } from "react-query";

/*
	Request States:
		new
		submitted
		sent for approval
		accepted
		rejected
		closed
*/

export const SubmittedRequests = () => {
  // const { sendRequestForApprovalEmail } = useNotification();
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  //!because React-query is not properly typed
  const query: any = useQuery('Submitted Requests', GetSubmittedRequests);

  const tableInstance = TableInstance(
    Columns(query, toggleHideDialog),
    Data(query)
  );
  if (query.isLoading) return <div>loading...</div>;

  if (query.isError) return <div>{query.error}</div>;

  return (
    <>
      <SubmittedRequestsTable
        TableInstance={tableInstance}
        toggleHideDialog={toggleHideDialog}
      />
      <FormDialog
        toggleHideDialog={toggleHideDialog}
        hideDialog={hideDialog}
        content={
          <IntakeForm
            columns={tableInstance.columns}
            toggleHideDialog={toggleHideDialog}
          />
        }
      />
    </>
  );
};
