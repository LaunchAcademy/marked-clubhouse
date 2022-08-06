import { Command } from "commander";
import fs from "fs";
import chalk from "chalk";
import emoji from "node-emoji";
import StoryParser from "../markdown/StoryParser";
import Client from "../import-adapters/shortcut/Client";

import configuration from "../configuration";
import normalizeStorySet from "../markdown/normalizeStorySet";
import StorySetImport from "../import-adapters/shortcut/StorySetImport";

type PrecheckError = {
  message: string;
};

const fileExists = (markdownFile): PrecheckError | undefined => {
  if (!fs.existsSync(markdownFile)) {
    return {
      message: "File not found.",
    };
  }
  return undefined;
};

const shortcutTokenSet = (): PrecheckError | undefined => {
  if (configuration.shortcut.apiToken?.trim() === "") {
    return {
      message: "Shortcut Token not set.",
    };
  }
  return undefined;
};

const shortcutTeamIdSet = (): PrecheckError | undefined => {
  if (!configuration.shortcut.teamId) {
    return {
      message: "Shortcut Team ID not set.",
    };
  }
  return undefined;
};

const pushPrechecks = [fileExists, shortcutTokenSet, shortcutTeamIdSet];

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
