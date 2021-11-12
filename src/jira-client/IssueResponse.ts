export type IssueResponse = {
  id: string,
  key: string,
  fields: {
    title: string
    description?: string
  }
}
