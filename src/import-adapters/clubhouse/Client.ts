import ClubhouseClient, {
  StoryChange as ClubhouseStoryChange,
  Story as ClubhouseStory,
  EpicChange as ClubhouseEpicChange,
  Epic as ClubhouseEpic,
} from "clubhouse-lib";

import configuration from "../../configuration";

type ClubhouseConfiguration = {
  apiToken?: string;
  projectId?: number;
};

export class Client {
  private client: ClubhouseClient<any, any>;

  constructor(config: ClubhouseConfiguration) {
    this.client = ClubhouseClient.create(config.apiToken || "");
  }

  createEpic(epicChange: ClubhouseEpicChange): Promise<ClubhouseEpic> {
    return this.client.createEpic(epicChange);
  }

  listEpics(): Promise<ClubhouseEpic[]> {
    return this.client.listEpics();
  }

  createStory(storyChange: ClubhouseStoryChange): Promise<ClubhouseStory> {
    return this.client.createStory(storyChange);
  }

  static factory(): Client {
    return new Client(configuration.clubhouse);
  }
}

export default Client;
