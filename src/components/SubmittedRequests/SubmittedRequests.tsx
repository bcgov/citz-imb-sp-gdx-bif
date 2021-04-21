import React, { useState, useEffect, useMemo } from 'react';
import { SubmittedRequestsTable } from 'components/SubmittedRequestsTable';
import { FormDialog } from 'components/FormDialog';
import { IntakeForm } from 'components/IntakeForm';
import { useBoolean } from '@fluentui/react-hooks';
import { useQuery } from 'react-query';
import { GetSubmittedRequests } from 'components/API/GET/GetSubmittedRequests';
import { Columns, Data, TableInstance } from '../SubmittedRequestsTable';
import { Loader } from '../Loader';
import { formProperties } from '@fluentui/utilities';
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

  const [initialValues, setInitialValues] = useState<any>({});

  const tableInstance = TableInstance(
    Columns(query, toggleHideDialog, setInitialValues),
    Data(query)
  );

  const resetInitialValues = () => {
    const tempInitialValues: any = {};
    for (let i = 0; i < tableInstance.columns.length; i++) {
      if (tableInstance.columns[i].fieldTypeKind === 20) {
        tempInitialValues[tableInstance.columns[i].fieldName] = [];
      } else {
        tempInitialValues[tableInstance.columns[i].fieldName] = '';
      }
    }

    tempInitialValues.Status = 'New';
    return tempInitialValues;
  };

  const handleNewForm = () => {
    setInitialValues(resetInitialValues());
    toggleHideDialog();
  };

  if (query.isLoading) return <div>loading...</div>;

  if (query.isError) return <div>{query.error}</div>;
  return (
    <>
      <SubmittedRequestsTable
        TableInstance={tableInstance}
        handleNewForm={handleNewForm}
      />
      <FormDialog
        toggleHideDialog={toggleHideDialog}
        hideDialog={hideDialog}
        content={
          <IntakeForm
            columns={tableInstance.columns}
            toggleHideDialog={toggleHideDialog}
            initialValues={initialValues}
          />
        }
        status={initialValues.Status}
      />
      <Loader />
    </>
  );
};
