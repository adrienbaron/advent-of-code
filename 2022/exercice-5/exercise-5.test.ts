import { describe, expect, it } from "vitest";

import {
  exercise5ExampleInput,
  exercise5ExampleInput2,
  exercise5Input1,
  exercise5Input2,
} from "./inputs";

const exercise5 = (input: string) => {
  return 0;
};

const exercise5Part2 = (input: string) => {
  return 0;
};

describe("exercise5", () => {
  it("exampleInput1", async () => {
    expect(exercise5(exercise5ExampleInput)).toBe(0);
  });

  it("input1", async () => {
    expect(exercise5(exercise5Input1)).toBe(0);
  });

  it("exampleInput2", async () => {
    expect(exercise5Part2(exercise5ExampleInput2)).toBe(0);
  });

  it("input2", async () => {
    expect(exercise5Part2(exercise5Input2)).toBe(0);
  });
});
