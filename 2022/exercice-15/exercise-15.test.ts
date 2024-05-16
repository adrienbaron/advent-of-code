import { describe, expect, it } from "vitest";

import {
  exercise15ExampleInput,
  exercise15ExampleInput2,
  exercise15Input1,
  exercise15Input2,
} from "./inputs";

type Coordinate = [number, number];

const computeMinC = (coordinates: Coordinate[]) =>
  coordinates.reduce(
    (cMin, c) => [Math.min(cMin[0], c[0]), Math.min(cMin[1], c[1])],
    [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
  );

const computeMaxC = (coordinates: Coordinate[]) =>
  coordinates.reduce(
    (cMin, c) => [Math.max(cMin[0], c[0]), Math.max(cMin[1], c[1])],
    [0, 0]
  );

const isOutOfBounds = (c: Coordinate, grid: string[][]): boolean =>
  c[0] < 0 || c[1] < 0 || c[1] >= grid.length || c[0] >= grid[0].length;

const exercise15 = (input: string) => {
  const paths = input
    .split("\n")
    .map((pathStr) =>
      pathStr
        .split(" -> ")
        .map((cStr) => cStr.split(",").map(Number) as Coordinate)
    );

  const minC = computeMinC(paths.map(computeMinC));
  const maxC = computeMaxC(paths.map(computeMaxC));
  const size = [maxC[0] - minC[0], maxC[1]];

  const normalizedPaths = paths.map((path) =>
    path.map((c) => [c[0] - minC[0], c[1]])
  );

  const grid: string[][] = [...new Array(size[1] + 1)].map(() =>
    [...new Array(size[0] + 1)].map(() => undefined)
  );

  normalizedPaths.forEach((path) => {
    let previousX: number, previousY: number;
    path.forEach(([x, y]) => {
      if (previousX == null) {
        previousX = x;
        previousY = y;
        return;
      }

      if (previousY !== y) {
        const start = Math.min(previousY, y);
        const end = Math.max(previousY, y);
        for (let i = start; i <= end; i++) {
          grid[i][x] = "X";
        }
      } else {
        const start = Math.min(previousX, x);
        const end = Math.max(previousX, x);
        for (let i = start; i <= end; i++) {
          grid[y][i] = "X";
        }
      }

      previousX = x;
      previousY = y;
    });
  });

  let sandC: Coordinate = [500 - minC[0], 0];
  let count = 0;
  while (true) {
    if (grid[sandC[1] + 1]?.[sandC[0]] == null) {
      sandC = [sandC[0], sandC[1] + 1];
      if (isOutOfBounds(sandC, grid)) return count;
    } else if (grid[sandC[1] + 1]?.[sandC[0] - 1] == null) {
      sandC = [sandC[0] - 1, sandC[1] + 1];
      if (isOutOfBounds(sandC, grid)) return count;
    } else if (grid[sandC[1] + 1]?.[sandC[0] + 1] == null) {
      sandC = [sandC[0] + 1, sandC[1] + 1];
      if (isOutOfBounds(sandC, grid)) return count;
    } else {
      grid[sandC[1]][sandC[0]] = "o";

      // if (count % 20 === 0) {
      //   console.log(
      //     grid.map((line) => line.map((val) => val ?? ".").join("")).join("\n")
      //   );
      // }
      sandC = [500 - minC[0], 0];
      count++;
    }
  }

  return 0;
};

const exercise15Part2 = (input: string) => {
  return 0;
};

describe("exercise15", () => {
  it("exampleInput1", async () => {
    expect(exercise15(exercise15ExampleInput)).toBe(24);
  });

  it("input1", async () => {
    expect(exercise15(exercise15Input1)).toBe(665);
  });

  it("exampleInput2", async () => {
    expect(exercise15Part2(exercise15ExampleInput2)).toBe(0);
  });

  it("input2", async () => {
    expect(exercise15Part2(exercise15Input2)).toBe(0);
  });
});
