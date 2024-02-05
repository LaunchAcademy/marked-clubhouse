import Story from "./Story";
import Epic from "./Epic";
import StorySet from "./StorySet";

function normalizeStorySet(stories: Story[]): StorySet {
  const epicMap = new Map<string, Epic>();
  stories.forEach((story) => {
    if (story.epic && story.epic.name) {
      const epicName = story.epic.name;
      let epic: Epic | undefined = epicMap.get(epicName);
      if (!epic) {
        epic = new Epic({ name: epicName });
        epicMap.set(epicName, epic);
      }
      story.epic = epic;
    }
  });
  return {
    stories,
    epicMap,
  };
}

export default normalizeStorySet;
