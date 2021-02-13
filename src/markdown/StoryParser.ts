import remark from "remark";
import fs from "fs";
import { root } from "mdast-builder";
import { Node } from "unist";
import toString from "mdast-util-to-string";

import Story from "./Story";
import Epic from "./Epic";

const storyHeaderDepth = 3;
const epicHeaderDepth = 2;

class StoryParser {
  filePath: string;
  stories: Story[];

  constructor(filePath: string) {
    this.filePath = filePath;
    this.stories = [];
  }

  public parse(): Story[] {
    const { filePath } = this;
    const tree: Node = remark().parse(fs.readFileSync(filePath));

    const children = Array.isArray(tree.children) ? tree.children : [];
    let i: number = 0;
    let story: Story;
    let currentEpic: Epic | undefined = undefined;
    do {
      if(this.isEpicHeader(children[i])) {
        currentEpic = new Epic({name: toString(children[i])})
        i++
        let epicDescriptionNodes:Node[] = []
        while(!this.isStoryHeader(children[i]) && i < children.length) {
          epicDescriptionNodes.push(children[i])
          i += 1
        }
        currentEpic.description = remark().stringify(root(epicDescriptionNodes))
      }

      if(this.isStoryHeader(children[i])) {
        story = new Story({name: toString(children[i])})
        i += 1;
        let storyDescriptionNodes:Node[] = [];
        while(!this.isEpicHeader(children[i]) && !this.isStoryHeader(children[i])  && i < children.length) {
          storyDescriptionNodes.push(children[i])
          i += 1
        }
        story.epic = currentEpic
        story.description = remark().stringify(root(storyDescriptionNodes))
        this.stories.push(story)
      }
      else {
        i += 1
      }

    } while(i < children.length)

    return this.stories;
  }

  private isEpicHeader(node: Node) : boolean {
    return node && node.type === "heading" && node.depth === epicHeaderDepth
  }

  private isStoryHeader(node: Node) : boolean {
    return node && node.type === "heading" && node.depth === storyHeaderDepth
  }
}

export default StoryParser;
