/** Shared currency formatting for cart UIs. */
export function formatUsd(n: number): string {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}
