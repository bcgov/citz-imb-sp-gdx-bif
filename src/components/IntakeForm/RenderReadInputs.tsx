import React from 'react';
import { TextField, Label } from '@fluentui/react';
import { Field } from 'formik';
export const RenderReadInputs = (
  name: string,
  hideOnForm: boolean,
  description: string,
  fieldValue: any,
  fieldName: string
) => {
  if (fieldName === undefined) {
    return;
  } else {
    return (
      <div>
        <Label>{name}</Label>
        <TextField
          borderless
          disabled
          value={fieldValue}
          autoAdjustHeight
          multiline
          resizable={false}
        />
      </div>
    );
  }
};
