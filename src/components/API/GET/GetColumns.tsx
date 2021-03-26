import { IColumn } from "@fluentui/react";
import { Column } from "react-table";
import { multiSelectFilter } from "components/SubmittedRequestsTable/Filters/StatusFilter/multiSelectFilter";

export const GetColumns = (viewColumns: [], fields: []): IColumn[] => {
  return viewColumns.map((column: string) => {
    const viewField: {
      InternalName: string;
      Title: string;
    } = fields.filter(
      (field: { InternalName: string }) => field.InternalName === column
    )[0];

    let newColumn: IColumn & any = {
      key: viewField.InternalName,
      name: viewField.Title,
      fieldName: viewField.InternalName,
      minWidth: 100,
      maxWidth: 100,
      accessor: viewField.InternalName,
      canSort: true,
      isSorted: false,
      isSortedDesc: true,
      isSortedDescending: true,
      canFilter: true,
    };

    return newColumn;
  });
};

// switch (viewField.FieldTypeKind) {
//   case 2: //Text
//     newColumn.disableFilters = false;
//     break;
//   case 3: //Multiple lines of text
//     newColumn.disableFilters = false;
//     break;
//   case 4: //DateTime
//     newColumn.Cell = ({ value }) =>
//       moment(value).format("MMMM Do, YYYY h:mm a");
//     newColumn.disableSortBy = false;
//     break;
//   case 12: //LinkTitle
//     if (viewField.EntityPropertyName !== "DocIcon") {
//       newColumn.Header = viewField.Title;
//       newColumn.Footer = viewField.Title;
//       newColumn.accessor = viewField.InternalName;
//       newColumn.disableFilters = false;
//     }
//     break;
//   case 20: //User
//     newColumn.Header = viewField.Title;
//     newColumn.Footer = viewField.Title;
//     newColumn.accessor = `${viewField.InternalName}Id`;
//     newColumn.Cell = ({ value }) => <User userId={value} />;
//     newColumn.disableFilters = false;
//     newColumn.Filter = SelectUserColumnFilter;
//     break;

//   default:
//   // console.log(
//   // 	`fields[${column}].FieldTypeKind=${fields[column].FieldTypeKind}`,
//   // 	fields[column]
//   // )
// }
// return newColumn;
//   });
// };
