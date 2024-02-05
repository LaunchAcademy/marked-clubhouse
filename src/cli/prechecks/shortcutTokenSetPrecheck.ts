import { PrecheckError } from "../PrecheckError";
import configuration from "../../configuration";

export const shortcutTokenSetPrecheck = (): PrecheckError | undefined => {
  if (configuration.shortcut.apiToken?.trim() === "") {
    return {
      message: "Shortcut Token not set.",
    };
  }
  return undefined;
};
