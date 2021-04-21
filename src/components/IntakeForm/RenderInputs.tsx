//https://docs.microsoft.com/en-us/previous-versions/office/sharepoint-csom/ee540543(v=office.15)
import { Field } from 'formik';
import React from 'react';
import { PeoplePicker , TextInput } from './Inputs';


export const RenderInputs = (
  fieldType: number,
  fieldName: string,
  name: string,
  hideOnForm = false,
  description: string,
  required: boolean,
  AllowMultipleValues: boolean,
  Status: string
) => {
  if (hideOnForm) {
    return <Field key={fieldName} name={fieldName} type='hidden' />;
  }
  switch (fieldType) {
    case 2: //Text
      //example
      // <SingleLineTextField label={title} name={internalName} toolTip={description} required={required} />

      return (
        <TextInput
          key={fieldName}
          fieldName={fieldName}
          title={name}
          icon={'TextBox'}
          description={description}
          required={required}
          status={Status}
        />
      );

      break;
    case 3: //"Note"
      return <div key={fieldName}>Description Field PlaceHolder</div>;

      break;
    case 9: //"Number"
      return (
        <TextInput
          key={fieldName}
          fieldName={fieldName}
          title={name}
          icon={'NumberField'}
          description={description}
          required={required}
          status={Status}
        />
      );

      break;
    case 4: //"DateTime":
      return <div key={fieldName}>Date Field PlaceHolder</div>;

      break;
    case 15: //"Choice":
      return <div key={fieldName}>Choice Field PlaceHolder</div>;

      break;
    case 20: //"User":
      return (
        <PeoplePicker
          key={fieldName}
          fieldName={fieldName}
          title={name}
          icon={'Contact'}
          description={description}
          required={required}
          AllowMultipleValues={AllowMultipleValues}
          status={Status}
        />
      );

      break;

    default:
      break;
  }
};
