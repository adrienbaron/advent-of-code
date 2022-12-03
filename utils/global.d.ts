export {};

declare global {
  interface Array<T> {
    sum(): number;
    splitInGroupsOf(itemsPerGroup: number): T[][];
  }
}
