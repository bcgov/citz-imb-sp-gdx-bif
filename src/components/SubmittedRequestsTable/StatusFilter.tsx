import React, { useState, FC, useEffect } from "react";
import { DefaultButton } from "@fluentui/react";

interface StatusFilterProps {
  query: any;
}

export const StatusFilter = ({ query }: StatusFilterProps) => {
  const [statusOptions, setStatusOptions] = useState(["test"]);

  console.log(`query`, query);

  useEffect(() => {
    if (query.isLoading || query.isError) {
      setStatusOptions([]);
    } else {
      const TableStatusOptions: any = query.data.items.map(
        (item: any) => item.Status
      );
      const statusSet: any = [...new Set(TableStatusOptions)];
      console.log(`statusSet`, statusSet);
      const status: any = statusSet.map((status: any) => {
        return { status, checked: true };
      });

      // console.log('status :>> ', status);

      setStatusOptions(status);
    }
  }, []);

  const handleFilterClick = (event: any) => {
    console.log(`event`, event.target.innerText);
    // let newRequestStates = statusOptions.map((thisStatus) => {
    //   if (thisStatus.status === newStatus)
    //     return { status: newStatus, checked: !thisStatus.checked };
    //   return thisStatus;
    // });

    // console.log("newRequestStates :>> ", newRequestStates);

    // setRequestStates(newRequestStates);

    // const statusColumn = tableInstance.columns.filter(
    //   (col) => col.key === "Status"
    // )[0];

    // statusColumn.setFilter(newStatus);
  };

  return statusOptions.map((statusContainer: any) => {
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
  });
};
