import { describe, expect, it } from "vitest";

import { exercise1ExampleInput, exercise1Input1 } from "./inputs";

function sortCalories(input: string): number[] {
  return input
    .split("\n\n")
    .map((elfCaloriesLine) =>
      elfCaloriesLine
        .split("\n")
        .map((str) => parseInt(str))
        .reduce((acc, num) => acc + num, 0)
    )
    .sort((a, b) => b - a);
}

function sumTop3(input: string): number {
  const caloriesSorted = sortCalories(input);

  return caloriesSorted[0] + caloriesSorted[1] + caloriesSorted[2];
}

describe("exercise1", () => {
  it("example", async () => {
    expect(sortCalories(exercise1ExampleInput)[0]).toBe(24000);
  });

  it("part-1", async () => {
    expect(sortCalories(exercise1Input1)[0]).toBe(67016);
  });

  it("part-2", async () => {
    expect(sumTop3(exercise1Input1)).toBe(200116);
  });
});
