import { GetList } from "./GetList";
import { GetItems } from "./GetItems";

export const GetMinistryAcronyms = async () => {
  const listName = "Ministry Acronyms";
  const listInfo = await GetList({ listName });
  const items = await GetItems({ listName });

  return { listInfo, items };
};
