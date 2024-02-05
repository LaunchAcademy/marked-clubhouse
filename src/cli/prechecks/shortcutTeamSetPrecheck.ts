import { PrecheckError } from "../PrecheckError";
import configuration from "../../configuration"

export const shortcutTeamSetPrecheck = (): PrecheckError | undefined => {
  if (!configuration.shortcut.teamId) {
    return {
      message: "Shortcut Team ID not set.",
    };
  }
  return undefined;
};
