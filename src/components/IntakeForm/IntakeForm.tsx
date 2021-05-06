import {
  DialogFooter,
  IStackProps,
  IStackStyles,
  Stack,
} from '@fluentui/react';
import { Form, Formik } from 'formik';
import { formSchema } from './FormSchema/formSchema';
import { OnSubmit } from './SubmitFunctions/OnSubmit';
import { Render } from './Render';
import { FormButtons } from './FormButtons';
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};
import _ from 'lodash';
const stackTokens = { childrenGap: 50 };

export const IntakeForm = ({
  columns,
  toggleHideDialog,
  initialValues,
  clientQuery,
  setShowLoader,
  columnsPerRow = 2,
}: any) => {
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
      onSubmit={async (values: any, formikBag: any) => {
        setShowLoader(true);
        await OnSubmit(
          values,
          toggleHideDialog,
          clientQuery.queryCache.queries[2].state.data.listInfo
            .ListItemEntityTypeFullName
        );
        clientQuery.invalidateQueries();

        clientQuery.invalidateQueries();
        clientQuery.invalidateQueries();
        clientQuery.invalidateQueries();
        clientQuery.invalidateQueries();
        clientQuery.invalidateQueries();
        setShowLoader(false);
      }}
      validationSchema={formSchema(
        initialValues.Status === 'Submitted' ? [] : columns
      )}
    >
      {(form) => {
        return (
          <Form style={{ background: 'white', padding: '32px' }}>
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

            <DialogFooter>
              <Stack {...columnProps} horizontal>
                {FormButtons(toggleHideDialog, initialValues.Status, form)}
              </Stack>
            </DialogFooter>
          </Form>
        );
      }}
    </Formik>
  );
};
