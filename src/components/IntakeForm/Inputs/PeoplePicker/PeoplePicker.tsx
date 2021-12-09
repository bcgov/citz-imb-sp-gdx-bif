import {
  FontIcon,
  IBasePickerSuggestionsProps,
  Label,
  NormalPeoplePicker,
} from '@fluentui/react';
import { useState } from 'react';
import { EnsureUser } from 'components/ApiCalls/PeoplePickerSearch/EnsureUser';
import { usePeoplePicker } from 'components/Hooks';
import { ErrorMessage, Field } from 'formik';
import './PeoplePicker.css';
import { EnsureUserLoader } from './EnsureUserLoader';
const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts',
};

interface PeoplePickerProps {
  fieldName: string;
  title: string;
  description: string;
  required: boolean;
  AllowMultipleValues: boolean;
  status: string;
}
export const PeoplePicker = ({
  fieldName,
  title,
  required,
  AllowMultipleValues,
}: PeoplePickerProps) => {
  const { searchPeople, setFormikValue } = usePeoplePicker();
  const [showEnsureUserLoader, setShowEnsureUserLoader] = useState(false);
  return (
    <>
      <Field
        name={fieldName}
        disabled={status === 'Submitted' && showEnsureUserLoader ? true : false}
      >
        {(fieldProps: any) => {
          return (
            <div>
              <div>
                {required ? (
                  AllowMultipleValues ? (
                    <Label htmlFor={fieldName}>
                      <FontIcon iconName={'People'} />
                      {title}*
                    </Label>
                  ) : (
                    <Label htmlFor={fieldName}>
                      <FontIcon iconName={'Contact'} />
                      {title}*
                    </Label>
                  )
                ) : AllowMultipleValues ? (
                  <Label htmlFor={fieldName}>
                    <FontIcon iconName={'People'} />
                    {title}
                  </Label>
                ) : (
                  <Label htmlFor={fieldName}>
                    <FontIcon iconName={'Contact'} />
                    {title}
                  </Label>
                )}
                {showEnsureUserLoader && (
                  <EnsureUserLoader loaderMessage='Adding User' />
                )}
              </div>

              <NormalPeoplePicker
                disabled={showEnsureUserLoader ? true : false}
                className='fluentUIPeoplePicker'
                onChange={async (pickerItems: any) => {
                  console.log('pickerItems', pickerItems);
                  if (pickerItems.length <= 0) {
                    setShowEnsureUserLoader(false);
                    setFormikValue(pickerItems, fieldProps, fieldName);
                  } else {
                    setShowEnsureUserLoader(true);

                    const ensuredUser = await EnsureUser(
                      pickerItems[0]?.account
                    );
                    setFormikValue(ensuredUser, fieldProps, fieldName);
                    setShowEnsureUserLoader(false);
                  }
                }}
                itemLimit={AllowMultipleValues ? undefined : 1}
                onResolveSuggestions={(filterText: any) => {
                  return searchPeople(filterText);
                }}
                pickerSuggestionsProps={suggestionProps}
                key={'normal'}
                removeButtonAriaLabel={'Remove'}
                onInputChange={(input: any) => {
                  return input;
                }}
                onBlur={() => {
                  fieldProps.form.setFieldTouched(fieldName, true, true);
                }}
              />
              <ErrorMessage
                name={fieldName}
                render={(msg: string) => {
                  return (
                    <p
                      style={{
                        fontSize: '12px',
                        color: ' rgb(164, 38, 44)',
                        margin: '0px',
                        paddingTop: '5px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {console.log(
                        `showEnsureUserLoader`,
                        showEnsureUserLoader
                      )}
                      {showEnsureUserLoader ? 'adding user to your site' : msg}
                    </p>
                  );
                }}
              />
            </div>
          );
        }}
      </Field>
    </>
  );
};
