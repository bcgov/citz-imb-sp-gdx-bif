import React, { FC } from 'react';
import { TextField, FontIcon } from '@fluentui/react';
import { test } from './testicons';
import { Field, ErrorMessage } from 'formik';
import * as ReactIcons from '@fluentui/react-icons';
interface TextInputProps {
  fieldName: string;
  title: string;
  defaultValue?: string;
  icon: string;
  description: string;
  required: boolean;
}
console.log(`ReactIcons`, ReactIcons);
export const TextInput: FC<TextInputProps> = ({
  fieldName,
  title,
  defaultValue = '',
  icon,
  required,
}) => {
  return (
    <div className='TextInput'>
      <Field
        // required={required}
        // type={type}

        defaultValue={defaultValue}
        variant='filled'
        as={TextField}
        // iconProps={{ iconName: 'TextBox' }}
        autoComplete='off'
        label={
          required ? (
            <div>
              <FontIcon iconName={icon} /> {title}*
            </div>
          ) : (
            <div>
              <FontIcon iconName={icon} /> {title}
            </div>
          )
        }
        fullWidth={true}
        name={fieldName}
        errorMessage={<ErrorMessage name={fieldName} />}
      />
    </div>
  );
};

export default TextInput;
