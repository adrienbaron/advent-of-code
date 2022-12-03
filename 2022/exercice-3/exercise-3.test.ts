import { describe, expect, it } from "vitest";

import {
  exercise3ExampleInput,
  exercise3ExampleInput2,
  exercise3Input1,
  exercise3Input2,
} from "./inputs";

const letterToScore = (common: string): number => {
  const charCodeUpper = "A".charCodeAt(0);
  const charCodeLower = "a".charCodeAt(0);
  const commonCharCode = common.charCodeAt(0);

  if (commonCharCode >= charCodeLower) {
    return commonCharCode - charCodeLower + 1;
  }

  return commonCharCode - charCodeUpper + 27;
};

const exercise3 = (input: string) => {
  return input
    .split("\n")
    .map((rucksack) => {
      const c1 = rucksack.slice(0, rucksack.length / 2);
      const c2 = rucksack.slice(rucksack.length / 2);

      const inC1 = new Set(c1.split(""));

      const common = c2.split("").filter((c) => inC1.has(c))[0];
      return letterToScore(common);
    })
    .reduce((acc, v) => acc + v, 0);
};

const exercise3Part2 = (input: string) => {
  const ruckSacks = input.split("\n");

  let total = 0;
  for (let i = 0; i < ruckSacks.length; i = i + 3) {
    const r1 = new Set(ruckSacks[i].split(""));
    const r2AndR1 = new Set(
      ruckSacks[i + 1].split("").filter((item) => r1.has(item))
    );

    const common = ruckSacks[i + 2]
      .split("")
      .filter((item) => r2AndR1.has(item))[0];
    total += letterToScore(common);
  }

  return total;
};

describe("exercise3", () => {
  it("exampleInput1", async () => {
    expect(exercise3(exercise3ExampleInput)).toBe(157);
  });

  it("input1", async () => {
    expect(exercise3(exercise3Input1)).toBe(7716);
  });

  it("exampleInput2", async () => {
    expect(exercise3Part2(exercise3ExampleInput2)).toBe(70);
  });

  it("input2", async () => {
    expect(exercise3Part2(exercise3Input2)).toBe(2973);
  });
});
