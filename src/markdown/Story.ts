import Epic from "./Epic";

type StoryOptions = {
  name?: string;
  epic?: Epic;
  description?: string;
};

export class Story {
  name?: string;
  epic?: Epic;
  description?: string;

  constructor(options: Partial<StoryOptions> = {}) {
    this.name = options.name;
    this.epic = options.epic;
    this.description = options.description;
  }
}

export default Story;
