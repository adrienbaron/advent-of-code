import { describe, expect, it } from "vitest";

import { exercise11ExampleInput, exercise11Input1 } from "./inputs";

type MonkeyProgramOperationOperand =
  | {
      type: "number";
      value: number;
    }
  | { type: "old" };

interface MonkeyProgramOperation {
  type: "multiply" | "add";
  operands: [MonkeyProgramOperationOperand, MonkeyProgramOperationOperand];
}

interface MonkeyProgramTest {
  type: "divisible";
  operand: number;
  ifTrue: number;
  ifFalse: number;
}

interface MonkeyProgram {
  items: number[];
  inspectedItemsCount: number;
  operation: MonkeyProgramOperation;
  test: MonkeyProgramTest;
}

const parseOperationOperand = (
  operandStr: string
): MonkeyProgramOperationOperand => {
  if (operandStr === "old") {
    return { type: "old" };
  }

  return { type: "number", value: Number(operandStr) };
};
const parseMonkeyProgram = (programStr: string): MonkeyProgram => {
  const [, startingItemsStr, operationStr, testStr, ifTrueStr, ifFalseStr] =
    programStr.split("\n");

  const startingItems = startingItemsStr
    .split(":")[1]
    .trim()
    .split(", ")
    .map(Number);

  const [operandOneStr, operationSignStr, operandTwoStr] = operationStr
    .split("new = ")[1]
    .split(" ");
  const operation: MonkeyProgramOperation = {
    type: operationSignStr === "*" ? "multiply" : "add",
    operands: [
      parseOperationOperand(operandOneStr),
      parseOperationOperand(operandTwoStr),
    ],
  };

  const test: MonkeyProgramTest = {
    type: "divisible",
    operand: Number(testStr.split("divisible by ")[1]),
    ifTrue: Number(ifTrueStr.split("throw to monkey ")[1]),
    ifFalse: Number(ifFalseStr.split("throw to monkey ")[1]),
  };

  return {
    items: startingItems,
    inspectedItemsCount: 0,
    operation,
    test,
  };
};
const runMonkeyProgramOperation = (
  operation: MonkeyProgramOperation,
  item: number
): number => {
  const operand1 =
    operation.operands[0].type === "old" ? item : operation.operands[0].value;
  const operand2 =
    operation.operands[1].type === "old" ? item : operation.operands[1].value;

  if (operation.type === "multiply") {
    return operand1 * operand2;
  }
  return operand1 + operand2;
};

const runMonkeyProgram = (
  monkeyProgramToRun: MonkeyProgram,
  monkeyPrograms: MonkeyProgram[]
) => {
  monkeyProgramToRun.items.forEach((item) => {
    item = runMonkeyProgramOperation(monkeyProgramToRun.operation, item);
    item = Math.floor(item / 3);

    const targetIndex =
      item % monkeyProgramToRun.test.operand === 0
        ? monkeyProgramToRun.test.ifTrue
        : monkeyProgramToRun.test.ifFalse;

    monkeyPrograms[targetIndex].items.push(item);

    monkeyProgramToRun.inspectedItemsCount++;
  });

  monkeyProgramToRun.items = [];
};

const exercise11 = (input: string) => {
  const monkeyProgramsStr = input.split("\n\n");

  const monkeyPrograms = monkeyProgramsStr.map((programStr) =>
    parseMonkeyProgram(programStr)
  );

  // Do 20 loops
  for (let i = 0; i < 20; i++) {
    monkeyPrograms.forEach((monkeyProgram) =>
      runMonkeyProgram(monkeyProgram, monkeyPrograms)
    );
  }

  const [top1, top2] = monkeyPrograms
    .map(({ inspectedItemsCount }) => inspectedItemsCount)
    .sort((a, b) => b - a);

  return top1 * top2;
};

describe("exercise11", () => {
  it("exampleInput1", async () => {
    expect(exercise11(exercise11ExampleInput)).toBe(10605);
  });

  it("input1", async () => {
    expect(exercise11(exercise11Input1)).toBe(56595);
  });
});
