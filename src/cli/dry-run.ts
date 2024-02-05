import { Command } from "commander";
import chalk from "chalk";
import emoji from "node-emoji";
import StoryParser from "../markdown/StoryParser";

import normalizeStorySet from "../markdown/normalizeStorySet";
import { fileExistsPrecheck } from "./prechecks/fileExistsPrecheck";

const pushPrechecks = [fileExistsPrecheck];

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
    } else {
      chalk.red("No stories found.");
    }
  }
};

export default () => {
  const program = new Command("dry-run");
  return program.command("dry-run <markdownFile>").description("parse a file and get story and epic counts").action(processPush);
};
