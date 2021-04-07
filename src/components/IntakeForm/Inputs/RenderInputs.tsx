//https://docs.microsoft.com/en-us/previous-versions/office/sharepoint-csom/ee540543(v=office.15)
import { NumberField } from './NumberField';
import { PeoplePicker } from './PeoplePicker';
import { TextInput } from './TextInput';
import { Field } from 'formik';

import React from 'react';

export const RenderInputs = (
  fieldType: number,
  fieldName: string,
  name: string,
  hideOnForm: boolean = false,
  description: string,
  required: boolean
) => {
  if (hideOnForm) {
    return <Field name={fieldName} type='hidden' />;
  }
  switch (fieldType) {
    case 2: //Text
      //example
      // <SingleLineTextField label={title} name={internalName} toolTip={description} required={required} />

      return (
        <TextInput
          fieldName={fieldName}
          title={name}
          icon={'TextBox'}
          description={description}
          required={required}
        />
      );

      break;
    case 3: //"Note"
      return <div>Description Field PlaceHolder</div>;

      break;
    case 9: //"Number"
      return (
        <TextInput
          fieldName={fieldName}
          title={name}
          icon={'NumberField'}
          description={description}
          required={required}
        />
      );

      break;
    case 4: //"DateTime":
      return <div>Date Field PlaceHolder</div>;

      break;
    case 15: //"Choice":
      return <div>Choice Field PlaceHolder</div>;

      break;
    case 20: //"User":
      return (
        <PeoplePicker
          fieldName={fieldName}
          title={name}
          icon={'Contact'}
          description={description}
          required={required}
        />
      );

      break;

    default:
      return <div>default render</div>;
      break;
  }
};
