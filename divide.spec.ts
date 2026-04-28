import { divide } from './divide';

describe('divide', () => {
  it('returns the correct answer', () => {
    expect(divide(10, 5)).toBe(2);
  });

  it('handles negative numbers', () => {
    expect(divide(-6, 2)).toBe(-3);
  });

  it('returns the same number when divided by one', () => {
    expect(divide(56, 1)).toBe(56);
  });
});
