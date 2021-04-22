import React from 'react';
import { TextField, Label } from '@fluentui/react';
import { Field } from 'formik';
export const RenderReadOnly = (
  name: string,
  hideOnForm: boolean,
  description: string,
  fieldValue: any,
  fieldName: string
) => {
  if (hideOnForm) {
    return <Field key={fieldName} name={fieldName} type='hidden' />;
  } else {
    return (
      <div>
        <Label>{name}</Label>
        <TextField borderless disabled value={fieldValue} />
      </div>
    );
  }
};
