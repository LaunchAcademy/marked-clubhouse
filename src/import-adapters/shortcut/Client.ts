import ShortcutClient, {
  Story as ShortcutStory,
  Epic as ShortcutEpic,
  EpicSlim as ShortcutEpicSlim,
  CreateEpic,
  CreateStoryParams,
} from "@useshortcut/client";

import configuration from "../../configuration";

type ShortcutConfiguration = {
  apiToken?: string;
  projectId?: number;
};

class Client {
  private client: ShortcutClient;

  constructor(config: ShortcutConfiguration) {
    this.client = new ShortcutClient(config.apiToken || "");
  }

  async createEpic(epicChange: CreateEpic): Promise<ShortcutEpic> {
    const resp = await this.client.createEpic(epicChange);
    return resp.data;
  }

  async listEpics(): Promise<ShortcutEpicSlim[]> {
    const resp = await this.client.listEpics({ includes_description: false });
    return resp.data;
  }

  async createStory(storyChange: CreateStoryParams): Promise<ShortcutStory> {
    const resp = await this.client.createStory(storyChange);
    return resp.data;
  }

  static factory(): Client {
    return new Client(configuration.shortcut);
  }
}

export default Client;
