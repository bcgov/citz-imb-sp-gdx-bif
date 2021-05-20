export const commandItems = (toggleHideDialog: any) => {
  return [
    {
      key: 'newItem',
      text: 'New',
      iconProps: { iconName: 'Add' },
      onClick: toggleHideDialog,
      styles: {
        main: {
          background: 'red',
        },
      },
    },
  ];
};
