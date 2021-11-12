import { ClientObject } from "./ClientObject";

export class IssueType extends ClientObject {
  getList() {
    return this.client.get("issuetype")
  }
}
