import { describe, expect, it } from "vitest";

import {
  exercise7ExampleInput,
  exercise7ExampleInput2,
  exercise7Input1,
  exercise7Input2,
} from "./inputs";

const exercise7 = (input: string) => {
  return 0;
};

const exercise7Part2 = (input: string) => {
  return 0;
};

describe("exercise7", () => {
  it("exampleInput1", async () => {
    expect(exercise7(exercise7ExampleInput)).toBe(0);
  });

  it("input1", async () => {
    expect(exercise7(exercise7Input1)).toBe(0);
  });

  it("exampleInput2", async () => {
    expect(exercise7Part2(exercise7ExampleInput2)).toBe(0);
  });

  it("input2", async () => {
    expect(exercise7Part2(exercise7Input2)).toBe(0);
  });
});
