import { Command } from "commander";
// import fs from "fs";
import chalk from "chalk";
import emoji from "node-emoji";
import StoryParser from "../markdown/StoryParser";
import { Client as ClubhouseClient } from "../import-adapters/clubhouse/Client";
import { Client as JiraClient } from "../import-adapters/jira/Client"

import configuration from "../configuration";
import normalizeStorySet from "../markdown/normalizeStorySet";
import { StorySetImport as ClubhouseStorySetImport } from "../import-adapters/clubhouse/StorySetImport";
import { StorySetImport as JiraStorySetImport } from "../import-adapters/jira/StorySetImport";

// type PrecheckError = {
//   message: string;
// };

// const fileExists = (markdownFile): PrecheckError | undefined => {
//   if (!fs.existsSync(markdownFile)) {
//     return {
//       message: "File not found.",
//     };
//   }
//   return undefined;
// };

// const clubhouseTokenSet = (): PrecheckError | undefined => {
//   if (configuration.clubhouse.apiToken?.trim() === "") {
//     return {
//       message: "Clubhouse Token not set.",
//     };
//   }
//   return undefined;
// };

// const clubhouseProjectSet = (): PrecheckError | undefined => {
//   if (!configuration.clubhouse.projectId) {
//     return {
//       message: "Clubhouse Project ID not set.",
//     };
//   }
//   return undefined;
// };

// const pushPrechecks = [fileExists, clubhouseTokenSet, clubhouseProjectSet];

const processPush = async (markdownFile: string) => {
  let errors: string[] = [];
  // errors = pushPrechecks.reduce((list: string[], func) => {
  //   const { message } = func(markdownFile) || {};
  //   if (message) {
  //     list = [...list, message];
  //   }
  //   return list;
  // }, errors);

  if (errors.length > 0) {
    errors.forEach((error) => {
      console.log(chalk.red(`${emoji.get("x")} ${error}`));
    });
  } else {
    const storyParser = new StoryParser(markdownFile);
    const stories = storyParser.parse();
    const storySet = normalizeStorySet(stories);
    if (storySet.stories.length > 0) {
      console.log(chalk.green(`${storySet.stories.length} stories found`));
      if (storySet.epicMap.size > 0) {
        console.log(chalk.yellow(`${storySet.epicMap.size} epic(s) found`));
      }
      if(configuration.jira.projectKey === "") {
        const setImport = new ClubhouseStorySetImport(storySet, ClubhouseClient.factory(), configuration.clubhouse.projectId);
        await setImport.create();
      }
      else {
        const setImport = new JiraStorySetImport(storySet, JiraClient.factory(), configuration.jira.projectKey || "" )
        await setImport.create();
      }

    } else {
      chalk.red("No stories found.");
    }
  }
};

export default () => {
  const program = new Command("push");
  return program.command("push <markdownFile>").description("push a markdown file to a remote").action(processPush);
};
