import { describe, expect, it } from "vitest";

import {
  exercise15ExampleInput,
  exercise15ExampleInput2,
  exercise15Input1,
  exercise15Input2,
} from "./inputs";

const exercise15 = (input: string) => {
  return 0;
};

const exercise15Part2 = (input: string) => {
  return 0;
};

describe("exercise15", () => {
  it("exampleInput1", async () => {
    expect(exercise15(exercise15ExampleInput)).toBe(0);
  });

  it("input1", async () => {
    expect(exercise15(exercise15Input1)).toBe(0);
  });

  it("exampleInput2", async () => {
    expect(exercise15Part2(exercise15ExampleInput2)).toBe(0);
  });

  it("input2", async () => {
    expect(exercise15Part2(exercise15Input2)).toBe(0);
  });
});
