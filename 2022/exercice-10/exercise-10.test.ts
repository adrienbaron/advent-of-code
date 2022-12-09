import { describe, expect, it } from "vitest";

import {
  exercise10ExampleInput,
  exercise10ExampleInput2,
  exercise10Input1,
  exercise10Input2,
} from "./inputs";

const exercise10 = (input: string) => {
  return 0;
};

const exercise10Part2 = (input: string) => {
  return 0;
};

describe("exercise10", () => {
  it("exampleInput1", async () => {
    expect(exercise10(exercise10ExampleInput)).toBe(0);
  });

  it("input1", async () => {
    expect(exercise10(exercise10Input1)).toBe(0);
  });

  it("exampleInput2", async () => {
    expect(exercise10Part2(exercise10ExampleInput2)).toBe(0);
  });

  it("input2", async () => {
    expect(exercise10Part2(exercise10Input2)).toBe(0);
  });
});
