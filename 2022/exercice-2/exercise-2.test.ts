import { describe, expect, it } from "vitest";

import {
  exercise2ExampleInput,
  exercise2Input1,
  exercise2Input2,
} from "./inputs";

type Shapes = "Rock" | "Paper" | "Scissors";

const theirInputToRockPaperScissors = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
} as const;

const myInputToRockPaperScissors = {
  X: "Rock",
  Y: "Paper",
  Z: "Scissors",
} as const;

const myInputToWinLoose = {
  X: "lose",
  Y: "draw",
  Z: "win",
} as const;

const scoreForShape = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
} as const;

const scoreForMatchResult = {
  win: 6,
  draw: 3,
  lose: 0,
} as const;

function matchWinLose(me: Shapes, other: Shapes): "win" | "draw" | "lose" {
  if (me === "Rock" && other === "Scissors") {
    return "win";
  }
  if (me === "Paper" && other === "Rock") {
    return "win";
  }
  if (me === "Scissors" && other === "Paper") {
    return "win";
  }

  if (me === other) {
    return "draw";
  }

  return "lose";
}

function winOrLoseToShape(
  winOrLose: "win" | "draw" | "lose",
  theirShape: Shapes
): Shapes {
  switch (winOrLose) {
    case "win":
      if (theirShape === "Scissors") {
        return "Rock";
      }
      if (theirShape === "Rock") {
        return "Paper";
      }
      if (theirShape === "Paper") {
        return "Scissors";
      }
      break;
    case "draw":
      return theirShape;
    case "lose":
      if (theirShape === "Rock") {
        return "Scissors";
      }
      if (theirShape === "Paper") {
        return "Rock";
      }
      if (theirShape === "Scissors") {
        return "Paper";
      }
      break;
  }
}

function score(input: string): number {
  return input
    .split("\n")
    .map((round) => {
      const [them, me] = round.split(" ");

      const themShape = theirInputToRockPaperScissors[them];
      const meShape = myInputToRockPaperScissors[me];

      return (
        scoreForShape[meShape] +
        scoreForMatchResult[matchWinLose(meShape, themShape)]
      );
    })
    .reduce((acc, i) => acc + i, 0);
}

function scoreIfStrategy(input: string): number {
  return input
    .split("\n")
    .map((round) => {
      const [them, winOrLose] = round.split(" ");

      const meShape = winOrLoseToShape(
        myInputToWinLoose[winOrLose],
        theirInputToRockPaperScissors[them]
      );

      const themShape = theirInputToRockPaperScissors[them];

      return (
        scoreForShape[meShape] +
        scoreForMatchResult[matchWinLose(meShape, themShape)]
      );
    })
    .reduce((acc, i) => acc + i, 0);
}

describe("exercise-2", () => {
  it("example", async () => {
    expect(score(exercise2ExampleInput)).toBe(15);
  });

  it("input1", async () => {
    expect(score(exercise2Input1)).toBe(15632);
  });

  it("input2", async () => {
    expect(scoreIfStrategy(exercise2Input2)).toBe(14416);
  });
});
