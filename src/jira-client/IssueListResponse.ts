import { IssueResponse } from "./IssueResponse"
export type IssueListResponse = {
  startAt?: number,
  maxResults?: number,
  total?: number,
  issues: IssueResponse[]
}
