import { SearchValueType, getSearchValueType } from "./getSearchValueType";

export function getNavigationPathBySearchValueType(
  value: string,
  type: SearchValueType
) {
  switch (type) {
    case SearchValueType.BlockNumber:
      return `/blocks/${value}`;
    case SearchValueType.Address:
      return `/addresses/${value}`;
    case SearchValueType.Transaction:
      return `/transactions/${value}`;
  }
  return undefined;
}

export function getNavigationPathBySearchValue(
  value: string
): string | undefined {
  const searchValueType = getSearchValueType(value);
  return getNavigationPathBySearchValueType(value, searchValueType);
}
