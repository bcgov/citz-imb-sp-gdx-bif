import React, { useState, useEffect, useContext } from "react";
import { DefaultButton, IColumn } from "@fluentui/react";
import { SetFilter } from "./SetFilter";

interface StatusFilterTypes {
  query: any;
  columns: Array<IColumn>;
}

interface statusOptionsTypes {
  status?: string;
  checked?: boolean;
}

export const StatusFilter = ({ query, columns }: StatusFilterTypes) => {
  const [statusOptions, setStatusOptions] = useState<statusOptionsTypes[]>([]);
  useEffect(() => {
    if (!query.isLoading && !query.isError) {
      //!Change type "any" to proper type when react-query types are updated
      const TableStatusOptions: any = query.data.items.map(
        (item: any) => item.Status
      );
      const statusSet: unknown[] = [...new Set(TableStatusOptions)];
      const status: statusOptionsTypes[] = statusSet.map((status: any) => {
        return { status, checked: true };
      });

      setStatusOptions(status);
    }
  }, [query.data?.items]);

  const handleFilterClick = (event: any) => {

    let newRequestStates = statusOptions.map((thisStatus) => {
      if (thisStatus.status === event.target.innerText)
        return { status: event.target.innerText, checked: !thisStatus.checked };
      return thisStatus;
    });

    setStatusOptions(newRequestStates);

    SetFilter(event.target.innerText, columns);
  };

  return (
    <>
      {" "}
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
