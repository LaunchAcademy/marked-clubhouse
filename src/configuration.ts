const config = {
  shortcut: {
    apiToken: process.env.SHORTCUT_TOKEN || "",
    projectId: parseInt(process.env.SHORTCUT_PROJECT_ID || "", 10),
    teamId: process.env.SHORTCUT_TEAM_ID || "",
    workflowStateId: process.env.SHORTCUT_WORKFLOW_STATE_ID || "",
  },
};

export default config;
