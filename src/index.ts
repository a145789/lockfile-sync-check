export function compareLockfiles(current: string, previous: string): boolean {
  // 实现lockfile对比逻辑
  return current === previous;
}

export type SyncCheckOptions = {
  failOnDiff?: boolean;
};
