import { Client } from "./Client";

export abstract class ClientObject {
  protected client: Client

  constructor(client: Client) {
    this.client = client
  }
}
