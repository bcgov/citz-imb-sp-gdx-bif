import React, { FC } from 'react';
import { TextField, FontIcon } from '@fluentui/react';
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
        errorMessage={
          <ErrorMessage
            name={fieldName}
            render={(msg) => {
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
