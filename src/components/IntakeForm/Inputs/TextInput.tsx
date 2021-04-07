import React, { FC } from 'react';
import { TextField, FontIcon } from '@fluentui/react';
import { test } from './testicons';
import { Field, ErrorMessage } from 'formik';
import * as ReactIcons from '@fluentui/react-icons';
interface TextInputProps {
  fieldName: string;
  title: string;
  defaultValue?: string;
}
console.log(`ReactIcons`, ReactIcons);
export const TextInput: FC<TextInputProps> = ({
  fieldName,
  title,
  defaultValue = '',
}) => {
  return (
    <div className='TextInput'>
      <FontIcon iconName='CompassNW' />
      <Field
        // required={required}
        // type={type}

        defaultValue={defaultValue}
        variant='filled'
        as={TextField}
        // iconProps={{ iconName: 'TextBox' }}
        autoComplete='off'
        label={title}
        fullWidth={true}
        name={fieldName}
        helperText={<ErrorMessage name={fieldName} />}
      />
    </div>
  );
};

export default TextInput;
