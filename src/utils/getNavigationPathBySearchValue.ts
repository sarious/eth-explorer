import { SearchValueType, getSearchValueType } from "./getSearchValueType";
import * as path from "../routing/path";

export function getNavigationPathBySearchValueType(
  value: string,
  type: SearchValueType
) {
  switch (type) {
    case SearchValueType.BlockNumber:
      return `/${path.blocks}/${value}`;
    case SearchValueType.Address:
      return `/${path.addresses}/${value}`;
    case SearchValueType.Transaction:
      return `/${path.transactions}/${value}`;
  }
  return undefined;
}

export function getNavigationPathBySearchValue(
  value: string
): string | undefined {
  const searchValueType = getSearchValueType(value);
  return getNavigationPathBySearchValueType(value, searchValueType);
}
