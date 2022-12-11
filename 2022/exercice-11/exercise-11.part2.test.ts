import { describe, expect, it } from "vitest";

import { exercise11ExampleInput2, exercise11Input2 } from "./inputs";

type MonkeyItem = { modulo: number; rest: number }[];

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
  index: number;
  startingValues: number[];
  items: MonkeyItem[];
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
const parseMonkeyProgram = (
  index: number,
  programStr: string
): MonkeyProgram => {
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
    index,
    startingValues: startingItems,
    items: [],
    inspectedItemsCount: 0,
    operation,
    test,
  };
};
const runMonkeyProgramOperation = (
  operation: MonkeyProgramOperation,
  item: MonkeyItem
) => {
  item.forEach((itemForMonkey) => {
    const operand1 =
      operation.operands[0].type === "old"
        ? itemForMonkey.rest
        : operation.operands[0].value;
    const operand2 =
      operation.operands[1].type === "old"
        ? itemForMonkey.rest
        : operation.operands[1].value;

    if (operation.type === "multiply") {
      itemForMonkey.rest = (operand1 * operand2) % itemForMonkey.modulo;
    } else {
      itemForMonkey.rest = (operand1 + operand2) % itemForMonkey.modulo;
    }
  });
};

const runMonkeyProgram = (
  monkeyProgramToRun: MonkeyProgram,
  monkeyPrograms: MonkeyProgram[]
) => {
  monkeyProgramToRun.items.forEach((item) => {
    runMonkeyProgramOperation(monkeyProgramToRun.operation, item);

    const targetIndex =
      item[monkeyProgramToRun.index].rest === 0
        ? monkeyProgramToRun.test.ifTrue
        : monkeyProgramToRun.test.ifFalse;

    monkeyPrograms[targetIndex].items.push(item);

    monkeyProgramToRun.inspectedItemsCount++;
  });

  monkeyProgramToRun.items = [];
};

const exercise11Part2 = (input: string) => {
  const monkeyProgramsStr = input.split("\n\n");

  const monkeyPrograms = monkeyProgramsStr.map((programStr, i) =>
    parseMonkeyProgram(i, programStr)
  );

  monkeyPrograms.forEach((monkeyProgram) =>
    monkeyProgram.startingValues.forEach((value) =>
      monkeyProgram.items.push(
        monkeyPrograms.map(({ test }) => ({
          modulo: test.operand,
          rest: value % test.operand,
        }))
      )
    )
  );

  for (let i = 0; i < 10000; i++) {
    monkeyPrograms.forEach((monkeyProgram) =>
      runMonkeyProgram(monkeyProgram, monkeyPrograms)
    );

    if (i % 1000 === 0 || i === 20) {
      console.log(`== After round ${i} ==`);
      monkeyPrograms.forEach(({ inspectedItemsCount, items }, i) =>
        console.log(
          `Monkey ${i}: inspected items ${inspectedItemsCount} times: ${items}`
        )
      );

      console.log("\n");
    }
  }

  const [top1, top2] = monkeyPrograms
    .map(({ inspectedItemsCount }) => inspectedItemsCount)
    .sort((a, b) => b - a);

  return top1 * top2;
};

describe("exercise11", () => {
  it("exampleInput2", async () => {
    expect(exercise11Part2(exercise11ExampleInput2)).toBe(2713310158);
  });

  it("input2", async () => {
    expect(exercise11Part2(exercise11Input2)).toBe(15693274740);
  });
});
