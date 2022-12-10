import { describe, expect, it } from "vitest";

import {
  exercise12ExampleInput,
  exercise12ExampleInput2,
  exercise12Input1,
  exercise12Input2,
} from "./inputs";

const exercise12 = (input: string) => {
  return 0;
};

const exercise12Part2 = (input: string) => {
  return 0;
};

describe("exercise12", () => {
  it("exampleInput1", async () => {
    expect(exercise12(exercise12ExampleInput)).toBe(0);
  });

  it("input1", async () => {
    expect(exercise12(exercise12Input1)).toBe(0);
  });

  it("exampleInput2", async () => {
    expect(exercise12Part2(exercise12ExampleInput2)).toBe(0);
  });

  it("input2", async () => {
    expect(exercise12Part2(exercise12Input2)).toBe(0);
  });
});
