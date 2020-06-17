import Story from "../../../markdown/Story";
import normalizeStorySet from "../../../markdown/normalizeStorySet";
import StorySet from "../../../markdown/StorySet";

import StorySetImport from "../StorySetImport";
import Client from "../Client";
jest.mock("../Client");

describe("story set import", () => {
  const epicName = "Epic One";
  const storyA = new Story({ name: "first story", epicName });
  const storyB = new Story({ name: "second story", epicName });
  let storySet: StorySet;
  let mockClient: Client;

  beforeEach(() => {
    storySet = normalizeStorySet([storyA, storyB]);
    mockClient = new Client({});
    mockClient.listEpics = jest.fn().mockResolvedValue([]);
    mockClient.createEpic = jest.fn().mockResolvedValue({ id: 456, name: epicName });
  });

  it("creates an epic", async () => {
    const storyImport = new StorySetImport(storySet, mockClient, 341314);
    await storyImport.create();
    expect(mockClient.createEpic).toHaveBeenCalled();
  });

  it("creates two stories", async () => {
    const storyImport = new StorySetImport(storySet, mockClient, 341314);
    await storyImport.create();
    expect(mockClient.createStory).toHaveBeenCalledTimes(2);
  });

  it("does not create an epic redundantly", async () => {
    mockClient.listEpics = jest.fn().mockResolvedValue([{ id: 1234123, name: epicName }]);
    const storyImport = new StorySetImport(storySet, mockClient, 341314);
    await storyImport.create();
    expect(mockClient.createEpic).not.toHaveBeenCalled();
  });
});
