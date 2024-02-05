# marked-stories

**A node CLI utility to import a markdown document of user stories into Shortcut**

## Setup

- Clone this repo  
- `yarn install`  
  
At LaunchWare, we use [`asdf`](https://github.com/asdf-vm/asdf) as our version manager, so a `.tool-versions` is included.

## Usage
```bash
[env_vars] /bin/marked-stories push [file]
```

For example,
```bash
SHORTCUT_TEAM_ID=[teamId] SHORTCUT_TOKEN=[token] SHORTCUT_WORKFLOW_STATE_ID=[stateId] bin/marked-stories push path/to/file.md
```

Three env variables are required to import user stories into Shortcut:

  - `SHORTCUT_TEAM_ID`
    - In Shortcut, under `Settings > Teams`, click the team
    - Then, find the `teamId` in the url: `/settings/teams/{teamId}?{queryParams}`
  - `SHORTCUT_TOKEN`
    - In Shortcut, under `Settings > API Tokens`, generate an API token 
  - `SHORTCUT_WORKFLOW_STATE_ID`
    - In Shortcut, under `Settings > Workflow States`, click the desired default State
    - Then, find the `stateId` prepopulated in the search bar: `state:{stateId}`

## Formatting Requirements
In the source markdown file, each user story must begin with a title formatted as an `h3`.

```markdown
### My First User Story

...

### My Second User Story

...
```