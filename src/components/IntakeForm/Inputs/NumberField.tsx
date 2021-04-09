import React, { FC } from 'react';
import { TextField } from '@fluentui/react';
import { Field, ErrorMessage } from 'formik';

interface NumberFieldProps {
  fieldName: string;
  title: string;
  defaultValue?: string;
}

export const NumberField: FC<NumberFieldProps> = ({
  fieldName,
  title,
  defaultValue = '',
}) => {
  return (
    <div className='NumberField'>
      <Field
        iconProps={{ iconName: 'NumberField' }}
        defaultValue={defaultValue}
        variant='filled'
        as={TextField}
        autoComplete='off'
        label={title}
        fullWidth={true}
        name={fieldName}
        helperText={<ErrorMessage name={fieldName} />}
      />
    </div>
  );
};

export default NumberField;
