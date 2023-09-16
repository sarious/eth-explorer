export type TruncPos = "start" | "middle" | "end";

export function truncHash(
  hash: string | undefined,
  maxLength: number,
  truncPos: TruncPos = "middle"
) {
  if (!hash) {
    return hash;
  }

  switch (truncPos) {
    case "start":
      return `...${hash.slice(-maxLength)}`;
    case "middle":
      const truncCount = hash.length - maxLength;
      if (truncCount <= "...".length) {
        return hash;
      }
      const endLength = Math.floor(maxLength / 2);
      const startLength = maxLength - endLength;
      return `${hash.slice(0, startLength)}...${hash.slice(-endLength)}`;
    case "end":
      return `${hash.slice(0, maxLength)}...`;
  }
}

export function truncAddress(address: string | undefined) {
  return truncHash(address, 12, "middle");
}

export function truncTxHash(txHash: string | undefined) {
  return truncHash(txHash, 16, "end");
}
