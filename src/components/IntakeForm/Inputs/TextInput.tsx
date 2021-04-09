import { FontIcon, TextField } from '@fluentui/react';
import { ErrorMessage, Field } from 'formik';
import React, { FC } from 'react';
interface TextInputProps {
  fieldName: string;
  title: string;
  defaultValue?: string;
  icon: string;
  description: string;
  required: boolean;
}

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
        defaultValue={defaultValue}
        variant='filled'
        as={TextField}
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
        errorMessage={
          <ErrorMessage
            name={fieldName}
            render={(msg: any) => {
              return (
                <p
                  style={{
                    minHeight: '16px',
                    fontSize: '12px',
                    color: ' rgb(164, 38, 44)',
                    margin: '0px',
                    paddingTop: '5px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {msg}
                </p>
              );
            }}
          />
        }
      />
    </div>
  );
};

export default TextInput;
