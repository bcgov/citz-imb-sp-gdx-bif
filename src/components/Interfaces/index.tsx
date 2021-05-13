export interface IreplacementPair {
  searchValue: string;
  replacementValue: string;
}

export interface ILoader {
  description?: React.ReactNode | string;
  label?: React.ReactNode | string;
  styles: any;
}

// API Calls
export interface IAddUsersToGroup {
  groupId: number;
  groupName?: string;
  loginNames: Array<string>;
}

export interface IGetGroupMembers {
  groupId?: number;
  groupName?: string;
}

export interface IUpdateListItem {
  listName?: string;
  listGUID?: string;
  items: any;
}

export interface IAddItemsToList {
  listName: string;
  items: any;
  ListItemEntityTypeFullName?: string;
}
export interface userToEmail {
  account: string;
  text: string;
  userId: string;
}

export interface IChangeGroupOwner {
  baseurl?: string;
  groupIdentifier: string | number;
  ownerIdentifier: string | number;
}
