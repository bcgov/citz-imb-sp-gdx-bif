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
import { OnSubmit } from './OnSubmit';
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
  clientQuery,
}: any) => {
  const definedColumns = columns.filter(
    (item: any) => item.fieldName !== undefined
  );
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: any) => {
        await OnSubmit(values, toggleHideDialog);
        clientQuery.invalidateQueries();
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
