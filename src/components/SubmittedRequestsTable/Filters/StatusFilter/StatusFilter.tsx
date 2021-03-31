import React, { useState, useEffect } from 'react';
import { Toggle, IColumn, Stack } from '@fluentui/react';

interface StatusFilterTypes {
	data: Array<any>;
	columns: Array<IColumn>;
	setFilter: Function;
}

interface statusOptionsTypes {
	status?: string;
	checked?: boolean;
}

export const StatusFilter = (props: StatusFilterTypes) => {
	const { data, columns, setFilter } = props;

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

			// get rid of duplicate Status values

			const statusSet = [...new Set(TableStatusOptions)];

			setStatusOptions((prevState) => {
				let tempArray: statusOptionsTypes[] = [];

				for (let i = 0; i < statusSet.length; i++) {
					const index = prevState.findIndex(
						(option) => option.status === statusSet[i]
					);

					if (index > -1) {
						tempArray.push(prevState[index]);
					} else {
						if (
							statusSet[i] === 'Closed' ||
							statusSet[i] === 'Rejected'
						) {
							tempArray.push({
								status: statusSet[i],
								checked: false,
							});
						} else {
							tempArray.push({
								status: statusSet[i],
								checked: true,
							});
						}
					}
				}

				return tempArray;
			});
		}
	}, [data]);

	useEffect(() => {
		//when the statusOptions change, get all the ones that are checked
		const filterValues = statusOptions
			.filter((option) => option.checked)
			.map((option) => option.status);

		//filter the data based on the checked statusOptions
		setFilter('Status', filterValues);

		return () => {};
	}, [statusOptions]);

	const handleFilterChange = (status: string, checked: boolean) => {
		// update the button state to show that whether it is in effect
		let newRequestStates = statusOptions.map((thisStatus) => {
			if (thisStatus.status === status)
				return {
					status,
					checked: checked,
				};
			return thisStatus;
		});

		setStatusOptions(newRequestStates);
	};

	return (
		<Stack horizontal>
			{statusOptions.map((statusContainer: any) => {
				return (
					<Toggle
						key={statusContainer.status}
						label={statusContainer.status}
						checked={statusContainer.checked}
						onText='On'
						offText='Off'
						onChange={(
							event: React.MouseEvent<HTMLElement>,
							checked?: boolean
						) =>
							handleFilterChange(
								statusContainer.status,
								checked ?? false
							)
						}
					/>
				);
			})}
		</Stack>
	);
};
