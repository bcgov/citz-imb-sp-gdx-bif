export interface ISubmittedRequestItem {
  Title: string;
  Ministry: string;
  Division: string;
  ClientName: string;
  ClientNumber?: Promise<number>;
  CASClient: number;
  CASResp: number;
  CASServ: number;
  CASSToB: number;
  CASProj: number;
  Status: string;
  ApproverId: { results: number[] };
  PrimaryContactId: number;
  FinContactId: { results: number[] };
  CASExpAuthId: number;
  OtherContactId?: { results: number[] };
}
