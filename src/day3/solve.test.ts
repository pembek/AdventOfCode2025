import { findMaxNDigits } from "./solve";
import {describe, expect, test} from '@jest/globals';


describe("solve", () => {
  test("basic example, simple increase", () => {
    const digits = [3, 4, 1, 9, 7];
    const bankString = digits.join("");
    const result = findMaxNDigits(bankString,3);
    // All valid subsequences of length 3, max is 9 7 with best prefix -> [4, 9, 7]
    expect(result).toEqual([4, 9, 7]);
  });

  test("n equals length: should return original array", () => {
    const digits = [5, 1, 3];
    const bankString = digits.join("");
    const result = findMaxNDigits(bankString,3);
    expect(result).toEqual([5, 1, 3]);
  });

  test("n = 1: should return the single maximum digit", () => {
    const digits = [3, 7, 2, 9, 4];
    const bankString = digits.join("");
    const result = findMaxNDigits(bankString,1);
    expect(result).toEqual([9]);
  });

  test("strictly decreasing input", () => {
    const digits = [9, 8, 7, 6, 5];
    const bankString = digits.join("");
    const result = findMaxNDigits(bankString,3);
    // Can't improve anything by removals; must respect order
    expect(result).toEqual([9, 8, 7]);
  });

  test("all equal digits", () => {
    const digits = [5, 5, 5, 5, 5];
    const bankString = digits.join("");
    const result = findMaxNDigits(bankString,3);
    expect(result).toEqual([5, 5, 5]);
  }); 

  test("case you asked about: [3, 1, 2, 9] with n = 2", () => {
    const digits = [3, 1, 2, 9];
    const bankString = digits.join("");
    const result = findMaxNDigits(bankString,2);
    // We can remove at most 2 digits, optimal subsequence is [3, 9]
    expect(result).toEqual([3, 9]);
  });

  test("another variant: big digit appears late and pushes smaller ones out", () => {
    const digits = [1, 2, 9, 8, 7];
    const bankString = digits.join("");
    const result = findMaxNDigits(bankString,3);
    // We can remove 2 digits (5 - 3), keep [9, 8, 7]
    expect(result).toEqual([9, 8, 7]);
  });

  test("large n with many digits, stability check", () => {
    const digits = [3, 9, 1, 4, 7, 8, 6, 0, 5, 2];
    const bankString = digits.join("");
    const result = findMaxNDigits(bankString,5);
    expect(result).toEqual([9, 8, 6, 5, 2]);
  });

  test("large n with many digits, stability check", () => {
    const digits = [3, 9, 1, 4, 7, 8, 6, 0, 5, 2];
    const bankString = digits.join("");
    const result = findMaxNDigits(bankString,5);
    expect(result).toEqual([9, 8, 6, 5, 2]);
  });

  test("selects the maximum 12-digit subsequence", () => {
    const result = findMaxNDigits("3434845634454364546334335333448443354324533545443235414334477424442444346844344244444434445333344314", 12);
    const expected = [8, 8, 8, 5, 3, 3, 3, 4, 4, 3, 1, 4];
    expect(result).toEqual(expected);
  });
  
});
