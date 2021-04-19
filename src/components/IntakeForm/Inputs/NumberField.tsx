import React, { FC } from 'react';
import { TextField } from '@fluentui/react';
import { Field, ErrorMessage } from 'formik';

interface NumberFieldProps {
  fieldName: string;
  title: string;
  defaultValue?: string;
  status: string;
}

export const NumberField: FC<NumberFieldProps> = ({ fieldName, title }) => {
  return (
    <div className='NumberField'>
      <Field
        iconProps={{ iconName: 'NumberField' }}
        variant='filled'
        as={TextField}
        autoComplete='off'
        label={title}
        fullWidth={true}
        name={fieldName}
        disabled={status === 'Submitted' ? true : false}
        helperText={<ErrorMessage name={fieldName} />}
      />
    </div>
  );
};

export default NumberField;
