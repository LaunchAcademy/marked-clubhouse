import { ClientObject } from "./ClientObject";

export class Board extends ClientObject {
  getList(params = {}) {
    return this.client.get("project/search", params).json()
  }
}
