import { describe, expect, it } from "vitest";

import {
  exercise11ExampleInput,
  exercise11ExampleInput2,
  exercise11Input1,
  exercise11Input2,
} from "./inputs";

const exercise11 = (input: string) => {
  return 0;
};

const exercise11Part2 = (input: string) => {
  return 0;
};

describe("exercise11", () => {
  it("exampleInput1", async () => {
    expect(exercise11(exercise11ExampleInput)).toBe(0);
  });

  it("input1", async () => {
    expect(exercise11(exercise11Input1)).toBe(0);
  });

  it("exampleInput2", async () => {
    expect(exercise11Part2(exercise11ExampleInput2)).toBe(0);
  });

  it("input2", async () => {
    expect(exercise11Part2(exercise11Input2)).toBe(0);
  });
});
