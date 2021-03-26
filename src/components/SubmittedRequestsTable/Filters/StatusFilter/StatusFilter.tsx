import React, { useState, useEffect, useContext } from 'react';
import { DefaultButton, IColumn } from '@fluentui/react';

interface StatusFilterTypes {
	data: Array<any>;
	columns: Array<IColumn>;
	setFilter: Function;
}

interface statusOptionsTypes {
	status?: string;
	checked?: boolean;
}

export const StatusFilter = ({
	data,
	columns,
	setFilter,
}: StatusFilterTypes) => {
	const [statusOptions, setStatusOptions] = useState<statusOptionsTypes[]>(
		[]
	);

	useEffect(() => {
		//get all the Status values being used in the data
		if (data !== undefined) {
			//@ts-ignore //!because React-Query is not properly typed
			const TableStatusOptions = data.map(
				//@ts-ignore //!because React-Query is not properly typed
				(item) => item.Status
			);

			//get rid of duplicate Status values
			const statusSet = [...new Set(TableStatusOptions)];

			const status = statusSet.map((status) => {
				return { status, checked: false };
			});

			//@ts-ignore //!because Set is not properly typed
			setStatusOptions(status);
		}
	}, [data]);

	useEffect(() => {
		console.log('statusOptions :>> ', statusOptions);

		//when the statusOptions change, get all the ones that are checked
		const filterValues = statusOptions
			.filter((option) => !option.checked)
			.map((option) => option.status);

		console.log('filterValues :>> ', filterValues);
		//filter the data based on the checked statusOptions
		setFilter('Status', filterValues);

		return () => {};
	}, [statusOptions]);

	const handleFilterClick = (event: any) => {
		//update the button state to show that whether it is in effect
		let newRequestStates = statusOptions.map((thisStatus) => {
			if (thisStatus.status === event.target.innerText)
				return {
					status: event.target.innerText,
					checked: !thisStatus.checked,
				};
			return thisStatus;
		});

		setStatusOptions(newRequestStates);
	};

	return (
		<>
			{' '}
			{statusOptions.map((statusContainer: any) => {
				return (
					<DefaultButton
						key={statusContainer.status}
						toggle
						checked={statusContainer.checked}
						text={statusContainer.status}
						// iconProps={muted ? volume0Icon : volume3Icon}
						onClick={handleFilterClick}
						// allowDisabledFocus
						// disabled={disabled}
						// id={state}
					/>
				);
			})}
		</>
	);
};
