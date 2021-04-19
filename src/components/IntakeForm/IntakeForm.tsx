import {
  DefaultButton,
  DialogFooter,
  IStackProps,
  IStackStyles,
  PrimaryButton,
  Stack,
} from '@fluentui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { formSchema } from './formSchema';
import { RenderInputs } from './Inputs/RenderInputs';
import { OnSubmit } from '../SubmittedRequestsTable';

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
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => {
        //OnSubmit(values, toggleHideDialog)
      }}
      validationSchema={formSchema(columns)}
    >
      {(form) => {
        return (
          <Form>
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
              <Stack {...columnProps}>
                {columns.map((column: any, i: number) => {
                  if (i % 2 === 0) {
                    return RenderInputs(
                      column.fieldTypeKind,
                      column.fieldName,
                      column.name,
                      column.hideOnForm,
                      column.description,
                      column.required,
                      column.AllowMultipleValues ?? false,
                      initialValues.Status
                    );
                  }
                })}
              </Stack>
              <Stack {...columnProps}>
                {columns.map((column: any, i: number) => {
                  if (i % 2 === 1) {
                    return RenderInputs(
                      column.fieldTypeKind,
                      column.fieldName,
                      column.name,
                      column.hideOnForm,
                      column.description,
                      column.required,
                      column.AllowMultipleValues ?? false,
                      initialValues.Status
                    );
                  }
                })}
              </Stack>
            </Stack>
            <DialogFooter>
              <DefaultButton
                onClick={() => {
                  console.log(form);
                  toggleHideDialog(), form.resetForm();
                }}
                text='Cancel'
              />
              <PrimaryButton type='submit' text='Submit' />
            </DialogFooter>
          </Form>
        );
      }}
    </Formik>
  );
};
