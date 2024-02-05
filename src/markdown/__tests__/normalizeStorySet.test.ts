import Story from "../Story";
import normalizeStorySet from "../normalizeStorySet";
import Epic from "../Epic";

describe("normalize story set", () => {
  const epicName = "Epic One";
  const epic = new Epic({ name: epicName });
  const storyA = new Story({ name: "first story", epic });
  const storyB = new Story({ name: "second story", epic });

  beforeEach(() => {});
  it("populates the epic reference", () => {
    normalizeStorySet([storyA, storyB]);
    const { epic } = storyA;
    expect(epic).toBeDefined();
  });

  it("does not replace the epic reference when encountered twice", () => {
    normalizeStorySet([storyA, storyB]);
    const { epic: epicA } = storyA;
    expect(epicA).toEqual(storyB.epic);
  });

  it("associates an existing epic to another story", () => {
    normalizeStorySet([storyA, storyB]);
    const { epic: epicA } = storyA;
    expect(epicA).toBeDefined();
    expect(epicA).toEqual(storyB.epic);
  });
});
