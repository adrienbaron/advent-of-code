import { describe, expect, it } from "vitest";

import {
  exercise13ExampleInput,
  exercise13ExampleInput2,
  exercise13Input1,
  exercise13Input2,
} from "./inputs";

const exercise13 = (input: string) => {
  return 0;
};

const exercise13Part2 = (input: string) => {
  return 0;
};

describe("exercise13", () => {
  it("exampleInput1", async () => {
    expect(exercise13(exercise13ExampleInput)).toBe(0);
  });

  it("input1", async () => {
    expect(exercise13(exercise13Input1)).toBe(0);
  });

  it("exampleInput2", async () => {
    expect(exercise13Part2(exercise13ExampleInput2)).toBe(0);
  });

  it("input2", async () => {
    expect(exercise13Part2(exercise13Input2)).toBe(0);
  });
});
