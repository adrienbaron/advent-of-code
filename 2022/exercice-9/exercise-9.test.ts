import { describe, expect, it } from "vitest";

import {
  exercise9ExampleInput,
  exercise9ExampleInput2,
  exercise9Input1,
  exercise9Input2,
} from "./inputs";

const exercise9 = (input: string) => {
  return 0;
};

const exercise9Part2 = (input: string) => {
  return 0;
};

describe("exercise9", () => {
  it("exampleInput1", async () => {
    expect(exercise9(exercise9ExampleInput)).toBe(0);
  });

  it("input1", async () => {
    expect(exercise9(exercise9Input1)).toBe(0);
  });

  it("exampleInput2", async () => {
    expect(exercise9Part2(exercise9ExampleInput2)).toBe(0);
  });

  it("input2", async () => {
    expect(exercise9Part2(exercise9Input2)).toBe(0);
  });
});
