import Story from "../Story";
import Epic from "../Epic";

describe("Markdown Story", () => {
  let story: Story;
  const storyName = "A good user story";
  const storyDescription = "So good it must be imported";
  const storyEpicName = "An epic epic";
  beforeEach(() => {
    story = new Story({
      name: storyName,
      description: storyDescription,
      epic: new Epic({name: storyEpicName}),
    });
  });

  it("has a name", () => {
    expect(story.name).toEqual(storyName);
  });
  it("has a description", () => {
    expect(story.description).toEqual(storyDescription);
  });

  it("has an epicName", () => {
    expect(story.epic).toBeDefined();
    expect(story.epic?.name).toEqual(storyEpicName);
  });
});
