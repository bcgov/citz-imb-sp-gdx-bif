import { RestCall } from "../RestCall/RestCall";
interface GetItemsProps {
  baseurl?: string;
  listName?: string;
  listGUID?: string;
  expand?: string;
  filter?: string;
  select?: string;
  sort?: string;
  sortDir?: string;
}
export const GetItems = async ({
  baseurl = "",
  listName,
  listGUID,
  expand = "Approver,PrimaryContact,CASExpAuth,OtherContact,FinContact,Author",
  select = "Title,Ministry,Division,ClientName,ClientNumber,CASClient,CASResp,CASServ,CASSToB,CASProj,Status,PrimaryContact/Title,PrimaryContactId,Approver/Title,ApproverId,CASExpAuth/Title,CASExpAuthId,OtherContact/Title,OtherContactId,FinContact/Title,FinContactId,Author/Title,AuthorId",

  filter = "",
  sort = "",
  sortDir = "Asc",
}: //   expand = "Author,Approver,PrimaryContact,CASExpAuth,OtherContact,FinContact",
//   select = "Title,Ministry,Division,ClientName,ClientNumber,CASClient,CASResp,CASServ,CASSToB,CASProj,Status,Author/Title,PrimaryContact/Title,Approver/Title,CASExpAuth/Title,OtherContact/Title,FinContact/Title",
GetItemsProps) => {
  if (!listName && !listGUID) throw "GetItems requires listGUID or listName";

  let endPoint = "";

  if (listGUID) {
    endPoint = `/_api/web/Lists('${listGUID}')/items`;
  } else {
    endPoint = `/_api/web/Lists/getByTitle('${listName}')/items`;
  }

  let endPointParameters = [];
  if (expand) endPointParameters.push(`$expand=${expand}`);
  if (filter) endPointParameters.push(`$filter=${filter}`);
  if (select) endPointParameters.push(`$select=${select}`);
  if (sort) endPointParameters.push(`$sortfield=${sort}&sortdir=${sortDir}`);
  endPointParameters.push("$top=5000");

  if (endPointParameters.length) {
    endPoint += `?${endPointParameters.join("&")}`;
  }

  const response = await RestCall({ url: baseurl, endPoint: endPoint });

  const filteredData = response.d.results.map((listItem: Object) => {
    let tempItem: any = { ...listItem };

    Object.entries(listItem).forEach(([key, listItemProperty]) => {
      if (typeof listItemProperty === "object") {
        if (listItemProperty.results) {
          if (key.slice(-2) !== "Id") {
            tempItem[key] = listItemProperty.results
              .map((person: { Title: string }) => {
                return person.Title;
              })
              .join("; ");
          }
        } else if (listItemProperty.Title) {
          tempItem[key] = listItemProperty.Title;
        }
      }
    });
    return tempItem;
  });
  return filteredData;
};
