import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { RenderInputs } from './Inputs/RenderInputs';
import {
  Stack,
  IStackProps,
  IStackStyles,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
} from '@fluentui/react';

const createProjSchema = Yup.object().shape({
  //Example
  //Title: Yup.string().required("Project Name is required"),
});

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

const stackTokens = { childrenGap: 50 };

export const IntakeForm = ({ columns, toggleHideDialog }: any) => {
  return (
    <Formik
      initialValues={{ status: 'New' }}
      onSubmit={(value: any) => {
        console.log(`value`, value);
      }}
      validationSchema={createProjSchema}
    >
      {({
        setFieldValue,
        values,
        errors,
        touched,
        setFieldTouched,
        handleChange,
        handleBlur,
      }) => {
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
                      column.hideOnForm
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
                      column.hideOnForm
                    );
                  }
                })}
              </Stack>
            </Stack>
            <DialogFooter>
              <DefaultButton onClick={toggleHideDialog} text='Close' />
              <PrimaryButton
                type='submit'
                onClick={toggleHideDialog}
                text='Submit'
              />
            </DialogFooter>
          </Form>
        );
      }}
    </Formik>
  );
};
