import { describe, expect, it } from "vitest";

import {
  exercise7ExampleInput,
  exercise7ExampleInput2,
  exercise7Input1,
  exercise7Input2,
} from "./inputs";

interface BaseFileSystemNode {
  type: "Folder" | "File";
  parent?: FileSystemNode;
  name: string;
}

interface FolderNode extends BaseFileSystemNode {
  type: "Folder";
  children: Record<string, FileSystemNode>;
  size: number;
}

interface FileNode extends BaseFileSystemNode {
  type: "File";
  size: number;
}

type FileSystemNode = FolderNode | FileNode;

interface CdCommand {
  type: "CdCommand";
  path: string;
}

interface LsCommand {
  type: "LsCommand";
  output: string[];
}

type Command = CdCommand | LsCommand;

const computeAllFolderSizes = (node: FolderNode): number => {
  node.size = [...Object.values(node.children)]
    .map((childNode) => {
      if (childNode.type === "File") {
        return childNode.size;
      }
      return computeAllFolderSizes(childNode);
    })
    .sum();

  return node.size;
};

const findAllFoldersWithSizeLowerThan = (
  node: FolderNode,
  size: number
): FolderNode[] => {
  return [
    ...(node.size < size ? [node] : []),
    ...Object.values(node.children)
      .filter((childNode) => childNode.type === "Folder")
      .map((childNode) =>
        findAllFoldersWithSizeLowerThan(childNode as FolderNode, size)
      )
      .flat(),
  ];
};

const buildFileSystem = (input: string): FolderNode => {
  const outputLines = input.split("\n");

  const commands: Command[] = [];

  for (let i = 0; i < outputLines.length; i++) {
    const line = outputLines[i];
    if (line.startsWith("$")) {
      const [, command, arg1] = line.split(" ");
      if (command === "cd") {
        commands.push({
          type: "CdCommand",
          path: arg1,
        });
      } else if (command === "ls") {
        i++;

        const lsCommand: LsCommand = {
          type: "LsCommand",
          output: [],
        };
        while (i < outputLines.length && !outputLines[i].startsWith("$")) {
          lsCommand.output.push(outputLines[i]);
          i++;
        }
        i--;
        commands.push(lsCommand);
      } else {
        throw new Error(`Command not recognised: ${line}`);
      }
    }
  }

  const rootNode: FolderNode = {
    type: "Folder",
    name: "ROOT",
    children: {},
    size: 0,
  };

  let currentNode: FolderNode = rootNode;

  commands.forEach((command) => {
    switch (command.type) {
      case "CdCommand":
        if (command.path === "..") {
          if (currentNode.parent?.type !== "Folder") {
            throw new Error("CD target isn't a folder: ");
          }
          currentNode = currentNode.parent;
        } else {
          if (!currentNode.children[command.path]) {
            currentNode.children[command.path] = {
              type: "Folder",
              name: command.path,
              children: {},
              size: 0,
              parent: currentNode,
            };
          }
          if (currentNode.children[command.path].type !== "Folder") {
            throw new Error("CD target isn't a folder: ");
          }
          currentNode = currentNode.children[command.path] as FolderNode;
        }
        break;
      case "LsCommand":
        command.output.forEach((lsOutputLine) => {
          const [sizeOrDir, name] = lsOutputLine.split(" ");
          if (!currentNode.children[name]) {
            if (sizeOrDir === "dir") {
              currentNode.children[name] = {
                type: "Folder",
                name,
                children: {},
                size: 0,
                parent: currentNode,
              };
            } else {
              currentNode.children[name] = {
                type: "File",
                name,
                size: parseInt(sizeOrDir),
                parent: currentNode,
              };
            }
          }
        });
        break;
    }
  });

  computeAllFolderSizes(rootNode);

  return rootNode;
};

const exercise7 = (input: string) => {
  const rootNode = buildFileSystem(input);

  return findAllFoldersWithSizeLowerThan(rootNode, 100000)
    .map(({ size }) => size)
    .sum();
};

const exercise7Part2 = (input: string) => {
  const rootNode = buildFileSystem(input);

  const totalSize = 70_000_000;
  const minFreeSpace = 30_000_000;

  const currentFreeSpace = totalSize - rootNode.children["/"].size;
  const minFolderToDeleteSize = minFreeSpace - currentFreeSpace;

  return findAllFoldersWithSizeLowerThan(rootNode, Number.MAX_SAFE_INTEGER)
    .map(({ size }) => size)
    .sort((a, b) => a - b)
    .find((size) => size > minFolderToDeleteSize);
};

describe("exercise7", () => {
  it("exampleInput1", async () => {
    expect(exercise7(exercise7ExampleInput)).toBe(95437);
  });

  it("input1", async () => {
    expect(exercise7(exercise7Input1)).toBe(1232307);
  });

  it("exampleInput2", async () => {
    expect(exercise7Part2(exercise7ExampleInput2)).toBe(24933642);
  });

  it("input2", async () => {
    expect(exercise7Part2(exercise7Input2)).toBe(7268994);
  });
});
