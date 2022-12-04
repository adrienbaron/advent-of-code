import { describe, expect, it } from "vitest";

import {
  exercise4ExampleInput,
  exercise4ExampleInput2,
  exercise4Input1,
  exercise4Input2,
} from "./inputs";

const rangeIsContained = (r1: number[], r2: number[]) => {
  return r1[0] <= r2[0] && r1[1] >= r2[1];
};

const rangeIsOverlapping = (r1: number[], r2: number[]) => {
  return r1[1] >= r2[0] && r1[0] <= r2[1];
};

const exercise4 = (input: string) => {
  return input
    .split("\n")
    .map((pair) => {
      const [elf1Str, elf2Str] = pair.split(",");
      const elf1Range = elf1Str.split("-").map(Number);
      const elf2Range = elf2Str.split("-").map(Number);

      if (
        rangeIsContained(elf1Range, elf2Range) ||
        rangeIsContained(elf2Range, elf1Range)
      ) {
        return 1;
      }
      return 0;
    })
    .sum();
};

const exercise4Part2 = (input: string) => {
  return input
    .split("\n")
    .map((pair) => {
      const [elf1Str, elf2Str] = pair.split(",");
      const elf1Range = elf1Str.split("-").map(Number);
      const elf2Range = elf2Str.split("-").map(Number);

      if (
        rangeIsOverlapping(elf1Range, elf2Range) ||
        rangeIsOverlapping(elf2Range, elf1Range)
      ) {
        return 1;
      }
      return 0;
    })
    .sum();
};

describe("exercise4", () => {
  it("exampleInput1", async () => {
    expect(exercise4(exercise4ExampleInput)).toBe(2);
  });

  it("input1", async () => {
    expect(exercise4(exercise4Input1)).toBe(532);
  });

  it("exampleInput2", async () => {
    expect(exercise4Part2(exercise4ExampleInput2)).toBe(4);
  });

  it("input2", async () => {
    expect(exercise4Part2(exercise4Input2)).toBe(854);
  });
});
