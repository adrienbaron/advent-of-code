import { describe, expect, it } from "vitest";

import {
  exercise10ExampleInput,
  exercise10ExampleInput2,
  exercise10Input1,
  exercise10Input2,
} from "./inputs";

interface BaseState {
  cycle: number;
  register: number;
}

interface StateSignalStrength extends BaseState {
  signalStrengths: number[];
}

const nextCycleStrength = (state: StateSignalStrength) => {
  state.cycle++;
  if ((state.cycle - 20) % 40 === 0 && state.cycle <= 220) {
    state.signalStrengths.push(state.cycle * state.register);
  }
};

const exercise10 = (input: string) => {
  const lines = input.split("\n");

  const state: StateSignalStrength = {
    cycle: 0,
    register: 1,
    signalStrengths: [],
  };

  lines.forEach((line) => {
    const [command, argStr] = line.split(" ");
    nextCycleStrength(state);
    if (command === "addx") {
      const argValue = parseInt(argStr);
      nextCycleStrength(state);
      state.register += argValue;
    }
  });

  return state.signalStrengths.sum();
};

interface StateCrt extends BaseState {
  crtScreen: boolean[];
}

const nextCycleCrt = (state: StateCrt) => {
  const row = state.cycle % 40;

  state.crtScreen.push(row >= state.register - 1 && row <= state.register + 1);
  state.cycle++;
};

const exercise10Part2 = (input: string) => {
  const lines = input.split("\n");

  const state: StateCrt = { cycle: 0, register: 1, crtScreen: [] };

  lines.forEach((line) => {
    const [command, argStr] = line.split(" ");
    nextCycleCrt(state);
    if (command === "addx") {
      const argValue = parseInt(argStr);
      nextCycleCrt(state);
      state.register += argValue;
    }
  });

  return state.crtScreen
    .splitInGroupsOf(40)
    .map((line) => line.map((val) => (val ? "#" : ".")).join(""))
    .join("\n");
};

describe("exercise10", () => {
  it("exampleInput1", async () => {
    expect(exercise10(exercise10ExampleInput)).toBe(13140);
  });

  it("input1", async () => {
    expect(exercise10(exercise10Input1)).toBe(14160);
  });

  it("exampleInput2", async () => {
    expect(exercise10Part2(exercise10ExampleInput2)).toBe(
      "##..##..##..##..##..##..##..##..##..##..\n" +
        "###...###...###...###...###...###...###.\n" +
        "####....####....####....####....####....\n" +
        "#####.....#####.....#####.....#####.....\n" +
        "######......######......######......####\n" +
        "#######.......#######.......#######....."
    );
  });

  it("input2", async () => {
    expect(exercise10Part2(exercise10Input2)).toBe(
      `###....##.####.###..###..####.####..##..
#..#....#.#....#..#.#..#.#....#....#..#.
#..#....#.###..#..#.#..#.###..###..#....
###.....#.#....###..###..#....#....#....
#.#..#..#.#....#.#..#....#....#....#..#.
#..#..##..####.#..#.#....####.#.....##..`
    );
  });
});
