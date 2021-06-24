import {
  DialogFooter,
  IStackProps,
  IStackStyles,
  Stack,
  Link,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import { Form, Formik } from 'formik';
import { formSchema } from './FormSchema/formSchema';
import { OnSubmit } from './SubmitFunctions/OnSubmit';
import { Render } from './RenderForm';
import { FormButtons } from './FormButtons';
import { useQueryClient } from 'react-query';
import _ from 'lodash';
import { formStyles } from './formStyles';
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};
import React from 'react';

const stackTokens = { childrenGap: 50 };

export const IntakeForm = ({
  columns,
  toggleHideDialog,
  initialValues,

  setShowLoader,
  columnsPerRow = 2,
}: any) => {
  const clientQuery: any = useQueryClient();
  const definedColumns = columns.filter(
    (item: any) => item.fieldName !== undefined
  );
  let filteredFields: any;

  if (initialValues.Status === 'New') {
    filteredFields = _.chunk(
      definedColumns.filter((column: any) => !column.hideOnForm),
      columnsPerRow
    );
  } else {
    filteredFields = _.chunk(definedColumns, columnsPerRow);
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: any) => {
        setShowLoader(true);
        await OnSubmit(
          values,
          toggleHideDialog,
          clientQuery.queryCache.queries[2].state.data.listInfo
            .ListItemEntityTypeFullName
        );
        clientQuery.invalidateQueries();
        setShowLoader(false);
      }}
      validationSchema={formSchema(
        initialValues.Status === 'Submitted' ? [] : columns
      )}
    >
      {(form) => {
        return (
          <Form style={formStyles(initialValues.Status)}>
            {filteredFields.map((column: any, i: number) => {
              return (
                <Stack
                  key={i}
                  horizontal
                  tokens={stackTokens}
                  styles={stackStyles}
                >
                  <Stack {...columnProps}>
                    {Render(
                      column[0].fieldTypeKind,
                      column[0].fieldName,
                      column[0].name,
                      column[0].hideOnForm,
                      column[0].description,
                      column[0].required,
                      column[0].AllowMultipleValues ?? false,
                      initialValues
                    )}
                  </Stack>
                  <Stack {...columnProps}>
                    {Render(
                      column[1]?.fieldTypeKind,
                      column[1]?.fieldName,
                      column[1]?.name,
                      column[1]?.hideOnForm,
                      column[1]?.description,
                      column[1]?.required,
                      column[1]?.AllowMultipleValues ?? false,
                      initialValues
                    )}
                  </Stack>
                </Stack>
              );
            })}
            <div>
              {' '}
              <br />
              <MessageBar
                messageBarType={MessageBarType.warning}
                messageBarIconProps={{
                  iconName: 'InfoSolid',
                }}
              >
                <h3 id='test'>Agreement:</h3>
                <Link
                  target='_blank'
                  href={
                    _spPageContextInfo.webAbsoluteUrl +
                    '/Shared%20Documents/GDX%20Service%20Billing%20Authorization%20Agreement.pdf'
                  }
                  underline
                >
                  GDX Service Billing Authorization Agreement
                </Link>
              </MessageBar>
            </div>

            <DialogFooter>
              <Stack {...columnProps} horizontal>
                {FormButtons(
                  toggleHideDialog,
                  initialValues.Status,
                  form,
                  clientQuery.getQueryData('CurrentUser'),
                  initialValues.CASExpAuthName
                )}
              </Stack>
            </DialogFooter>
          </Form>
        );
      }}
    </Formik>
  );
};
