import { describe, expect, it } from "vitest";

import {
  exercise6ExampleInput,
  exercise6ExampleInput2,
  exercise6Input1,
  exercise6Input2,
} from "./inputs";

const exercise6 = (input: string, consecutive: number) => {
  const characters = input.split("");

  for (let i = 0; i < characters.length - consecutive; i++) {
    const set = new Set(characters.slice(i, i + consecutive));
    if (set.size === consecutive) {
      return i + consecutive;
    }
  }

  return 0;
};

describe("exercise6", () => {
  it("exampleInput1", async () => {
    expect(exercise6(exercise6ExampleInput, 4)).toBe(7);
  });

  it("input1", async () => {
    expect(exercise6(exercise6Input1, 4)).toBe(1651);
  });

  it("exampleInput2", async () => {
    expect(exercise6(exercise6ExampleInput2, 14)).toBe(19);
  });

  it("input2", async () => {
    expect(exercise6(exercise6Input2, 14)).toBe(3837);
  });
});
