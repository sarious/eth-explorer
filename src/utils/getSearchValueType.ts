export enum SearchValueType {
  Unknown = 0,
  BlockNumber = 1,
  Address = 2,
  Transaction = 3,
}

export function getSearchValueType(value: string) {
  const isHash = value.toLowerCase().startsWith("0x");
  const blockNumber = parseInt(value);
  const isNumber = !isNaN(blockNumber);
  const isAddress = isHash && value.length === 42;
  const isTxHash = isHash && value.length === 66;
  if (isNumber) {
    if (!isHash) {
      return SearchValueType.BlockNumber;
    } else if (isAddress) {
      return SearchValueType.Address;
    } else if (isTxHash) {
      return SearchValueType.Transaction;
    }
  }
  return SearchValueType.Unknown;
}
