export type IssueCreationPayload = {
  title: string,
  projectKey: string,
  description?: string,
  issueTypeName?: "Story" | "Bug" | "Task" | "Epic"
  parentId?: string
}
