import { Alchemy, GetNftMetadataOptions, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export function getTokenMetadata(address: string) {
  return alchemy.core.getTokenMetadata(address);
}

export function getBalance(address: string) {
  return alchemy.core.getBalance(address);
}

export function getBlock(blockHashOrBlockTag: string | number) {
  return alchemy.core.getBlock(blockHashOrBlockTag);
}

export function getTransaction(txHash: string) {
  return alchemy.core.getTransaction(txHash);
}

export function isContractAddress(address: string): Promise<boolean> {
  return alchemy.core.isContractAddress(address);
}

export function getTokensForOwner(addressOrName: string) {
  return alchemy.core.getTokensForOwner(addressOrName);
}
export function getBlockWithTransactions(blockHashOrBlockTag: number | string) {
  return alchemy.core.getBlockWithTransactions(blockHashOrBlockTag);
}

export function getNftsForOwner(owner: string) {
  return alchemy.nft.getNftsForOwner(owner);
}

export function getNftMetadata(
  contractAddress: string,
  tokenId: string,
  options?: GetNftMetadataOptions
) {
  return alchemy.nft.getNftMetadata(contractAddress, tokenId, options);
}
