export interface IreplacementPair {
  searchValue: string;
  replacementValue: string;
}

export interface ILoader {
  description: string;
  label: string;
}

// API Calls
export interface IAddUsersToGroup {
  groupId: number;
  groupName?: string;
  loginNames: Array<string>;
}

export interface IGetGroupMembers {
  groupId: number;
  groupName?: string;
}
