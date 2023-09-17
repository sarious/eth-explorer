import { SearchValueType, getSearchValueType } from "./getSearchValueType";

test("search value should be BlockNumber", () => {
  const result = getSearchValueType("123");

  expect(result).toBe(SearchValueType.BlockNumber);
});

test("search value should be Address", () => {
  const result = getSearchValueType(
    "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5"
  );

  expect(result).toBe(SearchValueType.Address);
});

test("search value should be Transaction", () => {
  const result = getSearchValueType(
    "0xe1ef464c716f590d38a8823bea242087f013815d879b8be7d8c4915cb9d504cd"
  );

  expect(result).toBe(SearchValueType.Transaction);
});

test("search value should be Unknown for custom string", () => {
  const result = getSearchValueType("some string");

  expect(result).toBe(SearchValueType.Unknown);
});

test("search value should be Unknown for 64-character hash", () => {
  const result = getSearchValueType(
    "0xe1ef464c716f590d38a8823bea242087f013815d879b8be7d8c4915cb9d504"
  );

  expect(result).toBe(SearchValueType.Unknown);
});
