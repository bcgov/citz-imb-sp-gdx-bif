import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { formSchema } from './formSchema';
import { RenderInputs } from './Inputs/RenderInputs';
import {
  Stack,
  IStackProps,
  IStackStyles,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
} from '@fluentui/react';

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

const stackTokens = { childrenGap: 50 };

export const IntakeForm = ({ columns, toggleHideDialog }: any) => {
  const [initialValues, setInitialValues] = useState(() => {
    let tempInitialValues: any = {};
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].fieldTypeKind === 20) {
        tempInitialValues[columns[i].fieldName] = [];
      } else {
        tempInitialValues[columns[i].fieldName] = '';
      }
    }

    return tempInitialValues;
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(value: any) => {
        console.log(`value`, value);
      }}
      validationSchema={formSchema(columns)}
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
                      column.hideOnForm,
                      column.description,
                      column.required
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
                      column.required
                    );
                  }
                })}
              </Stack>
            </Stack>
            <DialogFooter>
              <DefaultButton onClick={toggleHideDialog} text='Close' />
              <PrimaryButton
                type='submit'
                // onClick={toggleHideDialog}
                text='Submit'
              />
            </DialogFooter>
          </Form>
        );
      }}
    </Formik>
  );
};
