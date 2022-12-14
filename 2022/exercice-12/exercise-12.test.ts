import { describe, expect, it } from "vitest";

import {
  exercise12ExampleInput,
  exercise12ExampleInput2,
  exercise12Input1,
  exercise12Input2,
} from "./inputs";

type Coordinate = [number, number];

const explore = (
  startC: Coordinate,
  targetC: Coordinate,
  matrix: number[][]
): number | undefined => {
  const queue: { c: Coordinate; d: number }[] = [{ c: startC, d: 0 }];
  const seenSet = new Set(`${startC[0]}-${startC[1]}`);

  while (queue.length) {
    const current = queue.shift();
    const currentC = current.c;

    if (targetC[0] === currentC[0] && targetC[1] === currentC[1]) {
      return current.d;
    }

    for (const cChange of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const [i, j] = cChange;
      const neighbourC: Coordinate = [currentC[0] + i, currentC[1] + j];

      if (
        matrix[neighbourC[0]]?.[neighbourC[1]] <=
          matrix[currentC[0]][currentC[1]] + 1 &&
        !seenSet.has(`${neighbourC[0]}-${neighbourC[1]}`)
      ) {
        seenSet.add(`${neighbourC[0]}-${neighbourC[1]}`);
        queue.push({ c: neighbourC, d: current.d + 1 });
      }
    }
  }
};

const exercise12 = (input: string) => {
  let start: Coordinate = [0, 0];
  let end: Coordinate = [0, 0];

  const matrix = input.split("\n").map((line, i) =>
    line.split("").map((c, j) => {
      if (c === "S") {
        start = [i, j];
        return "a".charCodeAt(0);
      }
      if (c === "E") {
        end = [i, j];
        return "z".charCodeAt(0);
      }
      return c.charCodeAt(0);
    })
  );

  return explore(start, end, matrix);
};

const exercise12Part2 = (input: string) => {
  const starts: Coordinate[] = [];
  let end: Coordinate = [0, 0];

  const matrix = input.split("\n").map((line, i) =>
    line.split("").map((c, j) => {
      if (c === "S" || c === "a") {
        starts.push([i, j]);
        return "a".charCodeAt(0);
      }
      if (c === "E") {
        end = [i, j];
        return "z".charCodeAt(0);
      }
      return c.charCodeAt(0);
    })
  );

  return starts
    .map((start) => explore(start, end, matrix))
    .sort((a, b) => a - b)[0];
};

describe("exercise12", () => {
  it("exampleInput1", async () => {
    expect(exercise12(exercise12ExampleInput)).toBe(31);
  });

  it("input1", async () => {
    expect(exercise12(exercise12Input1)).toBe(490);
  });

  it("exampleInput2", async () => {
    expect(exercise12Part2(exercise12ExampleInput2)).toBe(29);
  });

  it("input2", async () => {
    expect(exercise12Part2(exercise12Input2)).toBe(488);
  });
});
