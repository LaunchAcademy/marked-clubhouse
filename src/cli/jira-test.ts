import { Client } from "../jira-client/Client"
// import { Issue } from "../jira-client/Issue"
// import { IssueType } from "../jira-client/IssueType";
// import { Board } from "../jira-client/Project";
// import {inspect} from "util"
import { Client as ImportClient } from "../import-adapters/jira/Client"

const client = new Client({
  host: process.env.JIRA_HOST || "",
  projectKey: "CURR",
  authentication: {
    basic: {
      email: process.env.JIRA_EMAIL || "",
      password: process.env.JIRA_API_TOKEN || ""
    }
  }
});


(async () => {
  // const board = new Board(client);
  // console.log(await board.getList())

  // const issueType = new IssueType(client)
  // console.log(await issueType.getList())


  // const issue = new Issue(client)
  // console.log(await issue.getList("type = Epic"))

  // const issue = new Issue(client)
  // console.log(inspect(await issue.getCreateMetadata(), {depth: 100}))
  // await issue.create({
  //   title: "Test Epic",
  //   description: "* do you make\n* appropriate bullets\n* for formatting",
  //   issueTypeId: "10032",
  //   projectId: "10015"
  // })
  const importClient = new ImportClient(client)
  console.log(await importClient.listEpics())
})()
