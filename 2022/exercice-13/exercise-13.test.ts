import { describe, expect, it } from "vitest";

import {
  exercise13ExampleInput,
  exercise13ExampleInput2,
  exercise13Input1,
  exercise13Input2,
} from "./inputs";

const isLeftArraySmallerThanRightArray = (
  leftArr: unknown[],
  rightArr: unknown[]
): boolean | undefined => {
  for (let i = 0; i < leftArr.length; i++) {
    let leftArrElement = leftArr[i];
    if (i >= rightArr.length) {
      return false;
    }

    let rightArrElement = rightArr[i];
    if (
      typeof leftArrElement === "number" &&
      typeof rightArrElement === "number"
    ) {
      if (leftArrElement === rightArrElement) {
        continue;
      }

      return leftArrElement < rightArrElement;
    }

    if (typeof leftArrElement === "number") {
      leftArrElement = [leftArrElement];
    }
    if (typeof rightArrElement === "number") {
      rightArrElement = [rightArrElement];
    }

    const comparisonResult = isLeftArraySmallerThanRightArray(
      leftArrElement as unknown[],
      rightArrElement as unknown[]
    );
    if (comparisonResult != null) {
      return comparisonResult;
    }
  }

  if (rightArr.length > leftArr.length) {
    return true;
  }
};

const isCorrectOrder = (pairStr: string): boolean => {
  const [leftPacket, rightPacket] = pairStr
    .split("\n")
    .map((packet) => JSON.parse(packet));

  return isLeftArraySmallerThanRightArray(leftPacket, rightPacket);
};

const exercise13 = (input: string) => {
  const pairsStr = input.split("\n\n");

  return pairsStr
    .map((pairStr, i) => [isCorrectOrder(pairStr), i] as const)
    .filter(([isRightOrder]) => isRightOrder)
    .map(([, i]) => i + 1)
    .sum();
};

const exercise13Part2 = (input: string) => {
  const packet2 = [[2]];
  const packet6 = [[6]];

  const allPackets = [
    ...input
      .split("\n\n")
      .map((pair) => pair.split("\n"))
      .flat()
      .map((packet) => JSON.parse(packet)),
    packet2,
    packet6,
  ].sort((a, b) => {
    const compareResult = isLeftArraySmallerThanRightArray(a, b);
    if (compareResult === true) {
      return -1;
    } else if (compareResult === false) {
      return 1;
    }
    return 0;
  });

  return (allPackets.indexOf(packet2) + 1) * (allPackets.indexOf(packet6) + 1);
};

describe("exercise13", () => {
  it("exampleInput1", async () => {
    expect(exercise13(exercise13ExampleInput)).toBe(13);
  });

  it("input1", async () => {
    expect(exercise13(exercise13Input1)).toBe(6187);
  });

  it("exampleInput2", async () => {
    expect(exercise13Part2(exercise13ExampleInput2)).toBe(140);
  });

  it("input2", async () => {
    expect(exercise13Part2(exercise13Input2)).toBe(23520);
  });
});
