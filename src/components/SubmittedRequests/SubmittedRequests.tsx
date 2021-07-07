import { useState, useEffect } from 'react';
import { SubmittedRequestsTable } from 'components/SubmittedRequestsTable';
import { FormDialog } from 'components/FormDialog';
import { IntakeForm } from 'components/IntakeForm';
import { useBoolean } from '@fluentui/react-hooks';
import { useQuery, useQueryClient } from 'react-query';
import { GetSubmittedRequests } from 'components/API/GET/GetSubmittedRequests';
import { Columns, Data, TableInstance } from '../SubmittedRequestsTable';
import { ProgressIndicator } from '@fluentui/react';
import { Reauthenticator } from '../Reauthenticator';
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
  const [showLoader, setShowLoader] = useState(false);

  const tableInstance = TableInstance(
    Columns(query, toggleHideDialog, setInitialValues),
    Data(query)
  );

  useEffect(() => {
    if (!query.isLoading && !query.isError) {
      const GDXBIFID = new URLSearchParams(window.location.search).get(
        'GDXBIFID'
      );

      if (GDXBIFID) {
        const item = query.data?.items.filter(
          (item: Record<string, unknown>) => {
            return item.Id === parseInt(GDXBIFID);
          }
        )[0];
        item.TeamNames = [
          ...item.ApproverName.split('; '),
          ...item.CASExpAuthName.split('; '),
          ...item.FinContactName.split('; '),
          ...item.PrimaryContactName.split('; '),
        ];
        if (item.OtherContactName)
          item.TeamNames.push(...item.OtherContactName.split('; '));

        setInitialValues(item);
        toggleHideDialog();
      }
    }
  }, [query.isLoading, query.isError]);

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

  if (query.isLoading)
    return (
      <ProgressIndicator
        label={'Getting Data'}
        description={'Please Wait...'}
      />
    );

  if (query.isError) return <Reauthenticator />;
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
          <>
            <IntakeForm
              columns={tableInstance.columns}
              toggleHideDialog={toggleHideDialog}
              initialValues={initialValues}
              setShowLoader={setShowLoader}
            />
          </>
        }
        status={initialValues.Status}
        showLoader={showLoader}
      />
    </>
  );
};
