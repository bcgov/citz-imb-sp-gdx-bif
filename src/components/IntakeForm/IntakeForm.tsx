import {
  DialogFooter,
  IStackProps,
  IStackStyles,
  Stack,
} from '@fluentui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { formSchema } from './formSchema';
import { RenderInputs } from './RenderInputs';
import { OnSubmit } from '../SubmittedRequestsTable';
import { Render } from './Render';
import { FormButtons } from './FormButtons';
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

const stackTokens = { childrenGap: 50 };

export const IntakeForm = ({
  columns,
  toggleHideDialog,
  initialValues,
}: any) => {
  const definedColumns = columns.filter(
    (item: any) => item.fieldName !== undefined
  );
  return (
    <Formik
      initialValues={{
        Ministry: 'test',
        Division: 'test',
        ClientName: 'test',
        ClientNumber: 7,
        CASClient: 1,
        CASResp: 7,
        CASServ: 8,
        CASSToB: 7,
        CASProj: 8,
        Approver: [
          {
            text: 'Spiteri, Adam C CITZ:EX',
            userId: 5,
          },
        ],
        PrimaryContact: [
          {
            text: 'Spiteri, Adam C CITZ:EX',
            userId: 5,
          },
        ],
        CASExpAuth: [
          {
            text: 'Spiteri, Adam C CITZ:EX',
            userId: 5,
          },
        ],
        OtherContact: [
          {
            text: 'Spiteri, Adam C CITZ:EX',
            userId: 5,
          },
        ],
        FinContact: [
          {
            text: 'Spiteri, Adam C CITZ:EX',
            userId: 5,
          },
        ],
        Status: 'New',
        Author: [],
        undefined: '',
      }} //!change back to initialValues
      onSubmit={(values: any) => {
        console.log(`values`, values);
        OnSubmit(values, toggleHideDialog);

        // sendRequestForApprovalEmail(values.CASExpAuthId);
      }}
      validationSchema={formSchema(
        initialValues.Status === 'Submitted' ? [] : columns
      )}
    >
      {(form) => {
        return (
          <Form>
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
              <Stack {...columnProps}>
                {definedColumns.map((column: any, i: number) => {
                  if (i % 2 === 0) {
                    return Render(
                      column.fieldTypeKind,
                      column.fieldName,
                      column.name,
                      column.hideOnForm,
                      column.description,
                      column.required,
                      column.AllowMultipleValues ?? false,
                      initialValues
                    );
                  }
                })}
              </Stack>
              <Stack {...columnProps}>
                {definedColumns.map((column: any, i: number) => {
                  if (i % 2 === 1) {
                    return Render(
                      column.fieldTypeKind,
                      column.fieldName,
                      column.name,
                      column.hideOnForm,
                      column.description,
                      column.required,
                      column.AllowMultipleValues ?? false,
                      initialValues
                    );
                  }
                })}
              </Stack>
            </Stack>
            <DialogFooter>
              <Stack {...columnProps} horizontal>
                {FormButtons(toggleHideDialog, initialValues.Status)}
              </Stack>
            </DialogFooter>
          </Form>
        );
      }}
    </Formik>
  );
};
