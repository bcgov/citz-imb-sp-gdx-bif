import { Stack } from '@fluentui/react';
import React, { ReactNode } from 'react';

interface INavBarProps {
	children?: ReactNode;
	addNewRequest: () => void;
}

export const NavBar = ({ children, addNewRequest }: INavBarProps) => {
	return <Stack horizontal>{children}</Stack>;
};
