import { Client } from "./Client";
import StorySet from "../../markdown/StorySet";
import { IssueCreationPayload } from "../../jira-client/IssueCreationPayload";
import Story from "../../markdown/Story"
// import Epic from "../../markdown/Epic";

export class StorySetImport {
  storySet: StorySet;
  projectKey: string;
  private client: Client;

  constructor(storySet: StorySet, client: Client, projectKey: string) {
    this.storySet = storySet;
    this.client = client;
    this.projectKey = projectKey;
  }

  async create() {
    const jiraList = await this.client.listEpics();

    // build a list of persisted epics
    const epicNameIdMap = new Map<string, string>();
    jiraList.issues.forEach((jiraEpic) => {
      epicNameIdMap.set(jiraEpic.fields.title, jiraEpic.key);
    });


    const { epicMap, stories } = this.storySet;

    // create non-existent epics where necessary
    for (const [_, epic] of epicMap) {
      if (epic.name) {
        const persistedEpicId = epicNameIdMap.get(epic.name);
        if (!persistedEpicId) {
          const persistedEpic = await this.client.createEpic({
            title: epic.name,
            description: "",
            projectKey: this.projectKey
          });
          epicNameIdMap.set(epic.name, persistedEpic.key);
        }
      }
    }

    // create stories
    for (const story of stories) {
      const storyChange = this.makeStoryChange(story);
      if (story.epicName) {
        storyChange.parentId = epicNameIdMap.get(story.epicName);
      }
      await this.client.createStory(storyChange);
    }
  }

  private makeStoryChange(story: Story): IssueCreationPayload {
    return {
      title: story.name || "Imported Story",
      description: story.description,
      issueTypeName: "Story",
      projectKey: this.projectKey,
    };
  }
}

export default StorySetImport;
