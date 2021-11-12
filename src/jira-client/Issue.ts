import { ClientObject } from "./ClientObject";
import { IssueCreationPayload } from "./IssueCreationPayload";
import fnTranslate from 'md-to-adf'
import { IssueListResponse } from "./IssueListResponse";

interface IssueCreationPostPayload {
  fields: {
    description: undefined | string,
    parent: undefined | { key: string },
    summary: string,
    issuetype: {
      name: string | undefined
    }
    project: {
      key: string
    }
  }
}

export class Issue extends ClientObject {
  getList(jql) : Promise<IssueListResponse> {
    return this.client.get("search", {jql, validateQuery: "strict"}).json().then(data => data as IssueListResponse)
  }

  getCreateMetadata() {
    return this.client.get("issue/createmeta").json()
  }

  getEpics() : Promise<IssueListResponse> {
    return this.getList("type = Epic");
  }


  create(payload: IssueCreationPayload) {
    const { title, description, projectKey, issueTypeName, parentId } = payload
    let postPayload : IssueCreationPostPayload = {
      fields: {
        description: undefined,
        parent: undefined,
        summary: title,
        issuetype: {
          name: issueTypeName
        },
        project: {
          key: projectKey
        }
      }
    }
    if(description && description !== "") {
      postPayload = {
        ...postPayload,
        fields: {
          ...postPayload.fields,
          description: fnTranslate(description)
        }
      }
    }

    if(parentId && parentId !== "") {
      postPayload = {
        ...postPayload,
        fields: {
          ...postPayload.fields,
          parent: {
            key: parentId
          }
        }

      }
    }
    return this.client.post("issue", postPayload)
  }
}
