export type Gap = { type: 'gap'; pages: number[] };
export type PageItem = number | Gap;

const WINDOW = 2;

export const range = (from: number, to: number): number[] =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

export function buildPages(current: number, total: number): PageItem[] {
  if (total <= 1) return [];

  const visible = new Set([
    1,
    total,
    ...range(Math.max(1, current - WINDOW), Math.min(total, current + WINDOW)),
  ]);

  const sorted = [...visible].sort((a, b) => a - b);

  return sorted.flatMap((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) {
      return [
        { type: 'gap' as const, pages: range(sorted[i - 1] + 1, page - 1) },
        page,
      ];
    }
    return [page];
  });
}
