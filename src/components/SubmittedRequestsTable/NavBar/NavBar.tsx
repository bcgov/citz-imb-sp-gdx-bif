import { Stack } from '@fluentui/react';
import React, { ReactNode } from 'react';

interface INavBarProps {
  children?: ReactNode;
  addNewRequest: () => void;
}

export const NavBar = ({ children }: INavBarProps) => {
  return <Stack horizontal>{children}</Stack>;
};
