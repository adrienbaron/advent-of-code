import { describe, expect, it } from "vitest";

import {
  exercise6ExampleInput,
  exercise6ExampleInput2,
  exercise6Input1,
  exercise6Input2,
} from "./inputs";

const exercise6 = (input: string) => {
  return 0;
};

const exercise6Part2 = (input: string) => {
  return 0;
};

describe("exercise6", () => {
  it("exampleInput1", async () => {
    expect(exercise6(exercise6ExampleInput)).toBe(0);
  });

  it("input1", async () => {
    expect(exercise6(exercise6Input1)).toBe(0);
  });

  it("exampleInput2", async () => {
    expect(exercise6Part2(exercise6ExampleInput2)).toBe(0);
  });

  it("input2", async () => {
    expect(exercise6Part2(exercise6Input2)).toBe(0);
  });
});
