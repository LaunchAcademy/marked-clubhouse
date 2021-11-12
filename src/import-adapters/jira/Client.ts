import { Client as JiraClient } from "../../jira-client/Client";
import { Issue } from "../../jira-client/Issue"
import { IssueCreationPayload } from "../../jira-client/IssueCreationPayload"
import { IssueResponse } from "../../jira-client/IssueResponse";
import configuration from "../../configuration";

export class Client {
  private client: Issue

  constructor(client: JiraClient) {
    this.client = new Issue(client)
  }

  createEpic(payload: IssueCreationPayload) : Promise<IssueResponse> {
    return this.createStory({
      ...payload,
      issueTypeName: "Epic"
    })
  }

  async listEpics() {
    return this.client.getEpics();
  }

  createStory(payload: IssueCreationPayload) : Promise<IssueResponse>  {
    return this.client.create(payload).then(data => data as IssueResponse).catch(err => {
      console.log(err.response.body)
      throw err
    });
  }

  static factory(): Client {
    return new Client(new JiraClient(this.makeConfiguration()));
  }

  private static makeConfiguration() {
    const {host, email, apiToken, projectKey} = configuration.jira
    return {
      host,
      projectKey: projectKey || "",
      authentication: {
        basic: {
          email,
          password: apiToken
        }
      }
    }
  }
}
