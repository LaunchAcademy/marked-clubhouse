const config = {
  clubhouse: {
    apiToken: process.env.CLUBHOUSE_TOKEN || "",
    projectId: parseInt(process.env.CLUBHOUSE_PROJECT_ID || "", 10),
  },
  jira: {
    projectKey: process.env.JIRA_PROJECT_KEY,
    host: process.env.JIRA_HOST || "",
    email: process.env.JIRA_EMAIL || "",
    apiToken: process.env.JIRA_API_TOKEN || ""
  }
};

export default config;
