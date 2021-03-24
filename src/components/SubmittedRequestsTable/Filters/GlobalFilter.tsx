import { SearchBox, IIconProps, ISearchBoxStyles } from "@fluentui/react";

interface GlobalFilterProps {
  preGlobalFilteredRows: {}[];
  globalFilter: string;
  setGlobalFilter: Function;
  useAsyncDebounce: Function;
}
const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };

export const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  useAsyncDebounce,
}: GlobalFilterProps) => {
  const filterIcon: IIconProps = { iconName: "Filter" };

  const count = preGlobalFilteredRows.length;
  const onChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      <SearchBox
        styles={searchBoxStyles}
        placeholder={`Filter ${count} records...`}
        iconProps={filterIcon}
        onChange={(event?, newValue?: string) => {
          onChange(newValue);
        }}
      />
    </span>
  );
};
