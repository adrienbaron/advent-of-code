import { describe, expect, it } from "vitest";

import {
  exercise14ExampleInput,
  exercise14ExampleInput2,
  exercise14Input1,
  exercise14Input2,
} from "./inputs";

const exercise14 = (input: string) => {
  return 0;
};

const exercise14Part2 = (input: string) => {
  return 0;
};

describe("exercise14", () => {
  it("exampleInput1", async () => {
    expect(exercise14(exercise14ExampleInput)).toBe(0);
  });

  it("input1", async () => {
    expect(exercise14(exercise14Input1)).toBe(0);
  });

  it("exampleInput2", async () => {
    expect(exercise14Part2(exercise14ExampleInput2)).toBe(0);
  });

  it("input2", async () => {
    expect(exercise14Part2(exercise14Input2)).toBe(0);
  });
});
