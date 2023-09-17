import {
  getNavigationPathBySearchValue,
  getNavigationPathBySearchValueType,
} from "./getNavigationPathBySearchValue";
import { SearchValueType } from "./getSearchValueType";

test("getNavigationPathBySearchValueType should return navigation path for Block", () => {
  const result = getNavigationPathBySearchValueType(
    "1",
    SearchValueType.BlockNumber
  );

  expect(result).toBe("/blocks/1");
});

test("getNavigationPathBySearchValueType should return navigation path for Address", () => {
  const result = getNavigationPathBySearchValueType(
    "1",
    SearchValueType.Address
  );

  expect(result).toBe("/addresses/1");
});

test("getNavigationPathBySearchValueType should return navigation path for Transaction", () => {
  const result = getNavigationPathBySearchValueType(
    "1",
    SearchValueType.Transaction
  );

  expect(result).toBe("/transactions/1");
});

test("getNavigationPathBySearchValueType should return Undefined for Unknow type", () => {
  const result = getNavigationPathBySearchValueType(
    "sd",
    SearchValueType.Unknown
  );

  expect(result).toBeUndefined();
});

test("getNavigationPathBySearchValue should return navigation path for Block", () => {
  const result = getNavigationPathBySearchValue("123");

  expect(result).toBe("/blocks/123");
});

test("getNavigationPathBySearchValue should return navigation path for Address", () => {
  const address = "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5";
  const result = getNavigationPathBySearchValue(address);

  expect(result).toBe(`/addresses/${address}`);
});

test("getNavigationPathBySearchValue should return navigation path for Transaction", () => {
  const transactionHash =
    "0xe1ef464c716f590d38a8823bea242087f013815d879b8be7d8c4915cb9d504cd";
  const result = getNavigationPathBySearchValue(transactionHash);

  expect(result).toBe(`/transactions/${transactionHash}`);
});

test("getNavigationPathBySearchValue should return Undefined for custom string", () => {
  const transactionHash = "abc";
  const result = getNavigationPathBySearchValue(transactionHash);

  expect(result).toBeUndefined();
});

test("getNavigationPathBySearchValue should return Undefined for 64-charecter hash", () => {
  const transactionHash =
    "0xe1ef464c716f590d38a8823bea242087f013815d879b8be7d8c4915cb9d504";
  const result = getNavigationPathBySearchValue(transactionHash);

  expect(result).toBeUndefined();
});
