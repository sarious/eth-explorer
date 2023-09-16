export type TruncPos = "start" | "middle" | "end";

export function truncString(
  str: string | undefined,
  maxLength: number,
  truncPos: TruncPos = "middle"
) {
  if (!str) {
    return str;
  }

  switch (truncPos) {
    case "start":
      return `...${str.slice(-maxLength)}`;
    case "middle":
      const truncCount = str.length - maxLength;
      if (truncCount <= "...".length) {
        return str;
      }
      const endLength = Math.floor(maxLength / 2);
      const startLength = maxLength - endLength;
      return `${str.slice(0, startLength)}...${str.slice(-endLength)}`;
    case "end":
      return `${str.slice(0, maxLength)}...`;
  }
}

export function truncAddress(address: string | undefined) {
  return truncString(address, 12, "middle");
}

export function truncTxHash(txHash: string | undefined) {
  return truncString(txHash, 16, "end");
}
