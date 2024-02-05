#!/usr/bin/env node

// tslint:disable: no-console

import { Command } from "commander";
import push from "./cli/push";
import dryRun from "./cli/dry-run";

const prg = new Command();
const markedStories = prg.name("marked-stories");
markedStories.addCommand(push());
markedStories.addCommand(dryRun())

prg.parse(process.argv);
