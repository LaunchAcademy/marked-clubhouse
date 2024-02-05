import { Command } from "commander";
import chalk from "chalk";
import emoji from "node-emoji";
import StoryParser from "../markdown/StoryParser";
import Client from "../import-adapters/shortcut/Client";

import configuration from "../configuration";
import normalizeStorySet from "../markdown/normalizeStorySet";
import StorySetImport from "../import-adapters/shortcut/StorySetImport";
import { shortcutTeamSetPrecheck } from "./prechecks/shortcutTeamSetPrecheck";
import { fileExistsPrecheck } from "./prechecks/fileExistsPrecheck";
import { shortcutTokenSetPrecheck } from "./prechecks/shortcutTokenSetPrecheck";

const pushPrechecks = [fileExistsPrecheck, shortcutTokenSetPrecheck, shortcutTeamSetPrecheck];

const processPush = async (markdownFile: string) => {
  let errors: string[] = [];
  errors = pushPrechecks.reduce((list: string[], func) => {
    const { message } = func(markdownFile) || {};
    if (message) {
      list = [...list, message];
    }
    return list;
  }, errors);

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
      const setImport = new StorySetImport(storySet, Client.factory(), {
        projectId: configuration.shortcut.projectId,
        teamId: configuration.shortcut.teamId,
        workflowStateId: parseInt(configuration.shortcut.workflowStateId, 10),
      });
      await setImport.create();
    } else {
      chalk.red("No stories found.");
    }
  }
};

export default () => {
  const program = new Command("push");
  return program.command("push <markdownFile>").description("push a markdown file to a remote").action(processPush);
};
