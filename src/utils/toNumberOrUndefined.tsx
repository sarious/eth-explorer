import { BigNumber } from "alchemy-sdk";

export function toNumberOrUndefined(value: BigNumber | null | undefined) {
  if (value === null || value === undefined) return null;

  return value.toNumber();
}
