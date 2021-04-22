import { SearchBox, IIconProps, ISearchBoxStyles } from '@fluentui/react';

//!because react-table is not typed
interface GlobalFilterProps {
  preGlobalFilteredRows: any[];
  setGlobalFilter: any;
  useAsyncDebounce: any;
}
const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };

export const GlobalFilter = ({
  preGlobalFilteredRows,
  setGlobalFilter,
  useAsyncDebounce,
}: GlobalFilterProps) => {
  const filterIcon: IIconProps = { iconName: 'Filter' };

  const count = preGlobalFilteredRows.length;
  //!because react-table is not typed
  const onChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      <SearchBox
        styles={searchBoxStyles}
        placeholder={`Filter ${count} records...`}
        iconProps={filterIcon}
        onChange={(ev, newValue?: string) => {
          onChange(newValue);
        }}
        onKeyPress={(ev) => {
          if (ev.code === 'NumpadEnter' || ev.code === 'Enter') {
            ev.preventDefault();
            return false;
          }
        }}
      />
    </span>
  );
};
