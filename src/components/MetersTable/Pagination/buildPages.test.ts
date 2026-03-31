import { describe, it, expect } from 'vitest';
import { buildPages, range } from './buildPages';
import type { Gap } from './buildPages';

const gap = (pages: number[]): Gap => ({ type: 'gap', pages });

describe('buildPages', () => {
  describe('edge cases', () => {
    it('returns [] when total is 0', () => {
      expect(buildPages(1, 0)).toEqual([]);
    });

    it('returns [] when total is 1', () => {
      expect(buildPages(1, 1)).toEqual([]);
    });

    it('returns all pages when total is small enough to fit without gaps', () => {
      expect(buildPages(3, 5)).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('range', () => {
    it('returns a single-element array when from equals to', () => {
      expect(range(3, 3)).toEqual([3]);
    });

    it('returns consecutive numbers from start to end inclusive', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('works with arbitrary start value', () => {
      expect(range(7, 10)).toEqual([7, 8, 9, 10]);
    });
  });

  describe('gaps', () => {
    it('inserts a right gap when current page is near the start', () => {
      const result = buildPages(2, 10);
      expect(result).toEqual([1, 2, 3, 4, gap([5, 6, 7, 8, 9]), 10]);
    });

    it('inserts a left gap when current page is near the end', () => {
      const result = buildPages(9, 10);
      expect(result).toEqual([1, gap([2, 3, 4, 5, 6]), 7, 8, 9, 10]);
    });

    it('inserts gaps on both sides when current page is in the middle', () => {
      const result = buildPages(7, 20);
      expect(result).toEqual([
        1,
        gap([2, 3, 4]),
        5,
        6,
        7,
        8,
        9,
        gap([10, 11, 12, 13, 14, 15, 16, 17, 18, 19]),
        20,
      ]);
    });

    it('does not insert a gap when window touches the first page', () => {
      const result = buildPages(3, 10);
      expect(result).toEqual([1, 2, 3, 4, 5, gap([6, 7, 8, 9]), 10]);
    });

    it('does not insert a gap when window touches the last page', () => {
      const result = buildPages(8, 10);
      expect(result).toEqual([1, gap([2, 3, 4, 5]), 6, 7, 8, 9, 10]);
    });
  });
});
