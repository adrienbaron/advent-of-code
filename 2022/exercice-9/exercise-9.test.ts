import { describe, expect, it } from "vitest";

import {
  exercise9ExampleInput,
  exercise9ExampleInput2,
  exercise9Input1,
  exercise9Input2,
} from "./inputs";

interface Coordinate {
  x: number;
  y: number;
}

const moveNodeForCommand = (command: string, head) => {
  switch (command) {
    case "R":
      head.x++;
      break;
    case "L":
      head.x--;
      break;
    case "U":
      head.y++;
      break;
    case "D":
      head.y--;
      break;
  }
};

const updateNodePositionToFollowParent = (
  parentNode: Coordinate,
  nodeToMove: Coordinate
) => {
  if (
    Math.abs(parentNode.x - nodeToMove.x) > 1 ||
    Math.abs(parentNode.y - nodeToMove.y) > 1
  ) {
    nodeToMove.x += Math.sign(parentNode.x - nodeToMove.x);
    nodeToMove.y += Math.sign(parentNode.y - nodeToMove.y);
  }
};

const exercise9 = (input: string) => {
  const visitedPositions = new Set<string>();

  const head: Coordinate = { x: 0, y: 0 };
  const tail: Coordinate = { x: 0, y: 0 };

  input.split("\n").forEach((line) => {
    const [command, repeatCountStr] = line.split(" ");
    const repeatCount = parseInt(repeatCountStr);

    for (let i = 0; i < repeatCount; i++) {
      moveNodeForCommand(command, head);

      updateNodePositionToFollowParent(head, tail);

      visitedPositions.add(`${tail.x}:${tail.y}`);
    }
  });
  return visitedPositions.size;
};

const exercise9Part2 = (input: string) => {
  const visitedPositions = new Set<string>();

  const nodes = Array.from(Array(10)).map(() => ({ x: 0, y: 0 }));
  const head = nodes[0];
  const tail = nodes[nodes.length - 1];

  input.split("\n").forEach((line) => {
    const [command, repeatCountStr] = line.split(" ");
    const repeatCount = parseInt(repeatCountStr);

    for (let i = 0; i < repeatCount; i++) {
      moveNodeForCommand(command, head);

      nodes.forEach((node, i) => {
        if (i === nodes.length - 1) return;

        updateNodePositionToFollowParent(node, nodes[i + 1]);
      });

      visitedPositions.add(`${tail.x}:${tail.y}`);
    }
  });
  return visitedPositions.size;
};

describe("exercise9", () => {
  it("exampleInput1", async () => {
    expect(exercise9(exercise9ExampleInput)).toBe(13);
  });

  it("input1", async () => {
    expect(exercise9(exercise9Input1)).toBe(6367);
  });

  it("exampleInput2", async () => {
    expect(exercise9Part2(exercise9ExampleInput2)).toBe(36);
  });

  it("input2", async () => {
    expect(exercise9Part2(exercise9Input2)).toBe(2536);
  });
});
