import React, { ReactNode } from 'react';
import { CommandBar, ICommandBarItemProps, Stack } from '@fluentui/react';

interface INavBarProps {
  children?: ReactNode;
  addNewRequest: () => void;
}

export const NavBar = ({ children, addNewRequest }: INavBarProps) => {
  const commandItems: ICommandBarItemProps[] = [
    {
      key: 'newItem',
      text: 'New',
      cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
      iconProps: { iconName: 'Add' },
      onClick: addNewRequest,
    },
  ];

  return (
    <div>
      <CommandBar
        items={commandItems}
        ariaLabel='Use left and right arrow keys to navigate between commands'
      />
      <Stack horizontal>{children}</Stack>
    </div>
  );
};
