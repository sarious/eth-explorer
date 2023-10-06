export function parseHashOrTag(blockSearch: string) {
  const hash = blockSearch.toLowerCase().startsWith("0x");
  const blockNumber = parseInt(blockSearch);
  const blockHashOrTag =
    !isNaN(blockNumber) && !hash ? blockNumber : blockSearch;
  return blockHashOrTag;
}
