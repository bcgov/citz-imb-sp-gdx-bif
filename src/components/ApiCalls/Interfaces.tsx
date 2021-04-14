export interface IAPICallProps {
  listName: string;
  expand?: string;
  filter?: string;
  select?: string;
  sort?: string;
  sortDir?: string;
}

export interface IRestCall {
  endPoint: string;
  method?: string;
  body?: BodyInit | any;
  headers?: HeadersInit;
  cache?: RequestCache;
  noReturn?: boolean;
}
