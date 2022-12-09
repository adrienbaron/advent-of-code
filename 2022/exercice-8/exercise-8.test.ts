import { describe, expect, it } from "vitest";

import {
  exercise8ExampleInput,
  exercise8ExampleInput2,
  exercise8Input1,
  exercise8Input2,
} from "./inputs";

const isVisibleTreeAtIndex = (
  treeGrid: number[][],
  treeRowIndex: number,
  treeColumnIndex: number
) => {
  const treeHeight = treeGrid[treeRowIndex][treeColumnIndex];
  const treeRow = treeGrid[treeRowIndex];
  const treeColumn = treeGrid.map((row) => row[treeColumnIndex]);

  const beforeTreeInRow = treeRow.slice(0, treeColumnIndex);
  const afterTreeInRow = treeRow.slice(treeColumnIndex + 1);
  const beforeTreeInColumn = treeColumn.slice(0, treeRowIndex);
  const afterTreeInColumn = treeColumn.slice(treeRowIndex + 1);

  return (
    beforeTreeInRow.find((tree) => tree >= treeHeight) == null ||
    afterTreeInRow.find((tree) => tree >= treeHeight) == null ||
    beforeTreeInColumn.find((tree) => tree >= treeHeight) == null ||
    afterTreeInColumn.find((tree) => tree >= treeHeight) == null
  );
};

const getScenicDistanceForArray = (arr: number[], treeHouseHeight: number) => {
  for (let i = 0; i < arr.length; i++) {
    const currentTreeHeight = arr[i];
    if (treeHouseHeight <= currentTreeHeight) {
      return i + 1;
    }
  }

  return arr.length;
};

const getTreeScenicDistance = (
  treeGrid: number[][],
  treeRowIndex: number,
  treeColumnIndex: number
) => {
  const treeHeight = treeGrid[treeRowIndex][treeColumnIndex];
  const treeRow = treeGrid[treeRowIndex];
  const treeColumn = treeGrid.map((row) => row[treeColumnIndex]);

  const beforeTreeInRow = treeRow.slice(0, treeColumnIndex).reverse();
  const afterTreeInRow = treeRow.slice(treeColumnIndex + 1);
  const beforeTreeInColumn = treeColumn.slice(0, treeRowIndex).reverse();
  const afterTreeInColumn = treeColumn.slice(treeRowIndex + 1);

  return (
    getScenicDistanceForArray(beforeTreeInRow, treeHeight) *
    getScenicDistanceForArray(afterTreeInRow, treeHeight) *
    getScenicDistanceForArray(beforeTreeInColumn, treeHeight) *
    getScenicDistanceForArray(afterTreeInColumn, treeHeight)
  );
};

const exercise8 = (input: string) => {
  const treeGrid = input
    .split("\n")
    .map((line) => line.split("").map((char) => parseInt(char)));

  let visibleCount = 0;
  for (let treeRowIndex = 0; treeRowIndex < treeGrid.length; treeRowIndex++) {
    for (
      let treeColumnIndex = 0;
      treeColumnIndex < treeGrid[treeRowIndex].length;
      treeColumnIndex++
    ) {
      if (isVisibleTreeAtIndex(treeGrid, treeRowIndex, treeColumnIndex)) {
        visibleCount++;
      }
    }
  }

  return visibleCount;
};

const exercise8Part2 = (input: string) => {
  const treeGrid = input
    .split("\n")
    .map((line) => line.split("").map((char) => parseInt(char)));

  let bestScenicDistance = 0;
  for (let treeRowIndex = 0; treeRowIndex < treeGrid.length; treeRowIndex++) {
    for (
      let treeColumnIndex = 0;
      treeColumnIndex < treeGrid[treeRowIndex].length;
      treeColumnIndex++
    ) {
      const treeScenicDistance = getTreeScenicDistance(
        treeGrid,
        treeRowIndex,
        treeColumnIndex
      );
      bestScenicDistance = Math.max(treeScenicDistance, bestScenicDistance);
    }
  }

  return bestScenicDistance;
};

describe("exercise8", () => {
  it("exampleInput1", async () => {
    expect(exercise8(exercise8ExampleInput)).toBe(21);
  });

  it("input1", async () => {
    expect(exercise8(exercise8Input1)).toBe(1676);
  });

  it("exampleInput2", async () => {
    expect(exercise8Part2(exercise8ExampleInput2)).toBe(8);
  });

  it("input2", async () => {
    expect(exercise8Part2(exercise8Input2)).toBe(313200);
  });
});
