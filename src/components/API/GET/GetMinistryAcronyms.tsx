import { GetList } from "./GetList";
import { GetItems } from "./GetItems";

export const GetMinistryAcronyms = async () => {
  const listName = "Ministry Acronym";
  const listInfo = await GetList({ listName });
  const items = await GetItems({ listName });
  //   const defaultColumns = listInfo.Columns;

  console.log("listInfo :>> ", listInfo);

  return { listInfo, items };
};
