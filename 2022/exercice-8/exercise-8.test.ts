import { describe, expect, it } from "vitest";

import {
  exercise8ExampleInput,
  exercise8ExampleInput2,
  exercise8Input1,
  exercise8Input2,
} from "./inputs";

const exercise8 = (input: string) => {
  return 0;
};

const exercise8Part2 = (input: string) => {
  return 0;
};

describe("exercise8", () => {
  it("exampleInput1", async () => {
    expect(exercise8(exercise8ExampleInput)).toBe(0);
  });

  it("input1", async () => {
    expect(exercise8(exercise8Input1)).toBe(0);
  });

  it("exampleInput2", async () => {
    expect(exercise8Part2(exercise8ExampleInput2)).toBe(0);
  });

  it("input2", async () => {
    expect(exercise8Part2(exercise8Input2)).toBe(0);
  });
});
