import React from 'react';
import { RenderInputs } from './RenderInputs';
import { RenderReadInputs } from './RenderReadInputs';
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
  switch (initialValues.Status) {
    case 'New':
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
    case 'Submitted':
    case 'Approved':
    case 'Rejected':
      return RenderReadInputs(
        name,
        hideOnForm,
        description,
        initialValues[fieldName],
        fieldName
      );
  }
};
