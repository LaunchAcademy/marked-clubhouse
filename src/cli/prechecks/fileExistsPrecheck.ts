import fs from "fs";
import { PrecheckError } from "./PrecheckError";

export const fileExistsPrecheck = (markdownFile: string): PrecheckError | undefined => {
  if (!fs.existsSync(markdownFile)) {
    return {
      message: "File not found.",
    };
  }
  return undefined;
};
