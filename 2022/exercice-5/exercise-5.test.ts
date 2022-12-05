import { describe, expect, it } from "vitest";

import {
  exercise5ExampleInput,
  exercise5ExampleInput2,
  exercise5Input1,
  exercise5Input2,
} from "./inputs";

const parseStacks = (stacksString: string): string[][] => {
  const stacks: string[][] = [];

  const cratesLines = stacksString.split("\n");
  cratesLines.pop();

  for (let i = 0; i < cratesLines.length; i++) {
    const line = cratesLines[cratesLines.length - i - 1];

    line
      .split("")
      .splitInGroupsOf(4)
      .forEach((box, stackIndex) => {
        if (!stacks[stackIndex]) {
          stacks[stackIndex] = [];
        }
        if (box[1] !== " ") {
          stacks[stackIndex].push(box[1]);
        }
      });
  }
  return stacks;
};

const exercise5 = (input: string) => {
  const [stacksString, instructions] = input.split("\n\n");
  const stacks = parseStacks(stacksString);

  instructions.split("\n").forEach((instruction) => {
    const [_, countStr, __, fromStr, ___, toStr] = instruction.split(" ");
    for (let i = 0; i < parseInt(countStr); i++) {
      const fromIndex = parseInt(fromStr) - 1;
      const toIndex = parseInt(toStr) - 1;

      const box = stacks[fromIndex].pop();
      stacks[toIndex].push(box);
    }
  });

  return stacks.map((stack) => stack[stack.length - 1]).join("");
};

const exercise5Part2 = (input: string) => {
  const [stacksString, instructions] = input.split("\n\n");
  const stacks = parseStacks(stacksString);

  instructions.split("\n").forEach((instruction) => {
    const [_, countStr, __, fromStr, ___, toStr] = instruction.split(" ");
    const count = parseInt(countStr);
    const fromIndex = parseInt(fromStr) - 1;
    const toIndex = parseInt(toStr) - 1;

    const boxes = stacks[fromIndex].splice(stacks[fromIndex].length - count);
    stacks[toIndex] = [...stacks[toIndex], ...boxes];
  });

  return stacks.map((stack) => stack[stack.length - 1]).join("");
};

describe("exercise5", () => {
  it("exampleInput1", async () => {
    expect(exercise5(exercise5ExampleInput)).toBe("CMZ");
  });

  it("input1", async () => {
    expect(exercise5(exercise5Input1)).toBe("TWSGQHNHL");
  });

  it("exampleInput2", async () => {
    expect(exercise5Part2(exercise5ExampleInput2)).toBe("MCD");
  });

  it("input2", async () => {
    expect(exercise5Part2(exercise5Input2)).toBe("JNRSCDWPP");
  });
});
