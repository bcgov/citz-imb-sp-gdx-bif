import React from 'react';
import { RenderInputs } from './RenderInputs';
import { RenderReadOnly } from './RenderReadOnly';
export const Render = (
  fieldType: number,
  fieldName: string,
  name: string,
  hideOnForm = false,
  description: string,
  required: boolean,
  AllowMultipleValues: boolean,
  initialValues: any
): any => {
  if (initialValues.Status === 'New') {
    return RenderInputs(
      fieldType,
      fieldName,
      name,
      hideOnForm,
      description,
      required,
      AllowMultipleValues,
      initialValues.Status
    );
  } else if (initialValues.Status === 'Submitted') {
    return RenderReadOnly(
      name,
      hideOnForm,
      description,
      initialValues[fieldName],
      fieldName
    );
  }
};
