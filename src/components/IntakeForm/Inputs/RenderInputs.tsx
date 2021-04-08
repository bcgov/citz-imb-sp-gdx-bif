//https://docs.microsoft.com/en-us/previous-versions/office/sharepoint-csom/ee540543(v=office.15)
import { Field } from 'formik';
import React from 'react';
import { PeoplePicker } from './PeoplePicker';
import { TextInput } from './TextInput';

export const RenderInputs = (
	fieldType: number,
	fieldName: string,
	name: string,
	hideOnForm: boolean = false,
	description: string,
	required: boolean,
	AllowMultipleValues: boolean
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
				/>
			);

			break;

		default:
			return <div key={fieldName}>default render</div>;
			break;
	}
};
