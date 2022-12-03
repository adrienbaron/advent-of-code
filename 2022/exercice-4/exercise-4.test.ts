import { describe, expect, it } from "vitest";

import {
  exercise4ExampleInput,
  exercise4ExampleInput2,
  exercise4Input1,
  exercise4Input2,
} from "./inputs";

const exercise4 = (input: string) => {
  return 0;
};

const exercise4Part2 = (input: string) => {
  return 0;
};

describe("exercise4", () => {
  it("exampleInput1", async () => {
    expect(exercise4(exercise4ExampleInput)).toBe(0);
  });

  it("input1", async () => {
    expect(exercise4(exercise4Input1)).toBe(0);
  });

  it("exampleInput2", async () => {
    expect(exercise4Part2(exercise4ExampleInput2)).toBe(0);
  });

  it("input2", async () => {
    expect(exercise4Part2(exercise4Input2)).toBe(0);
  });
});
