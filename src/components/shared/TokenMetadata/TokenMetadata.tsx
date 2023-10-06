import { FC } from "react";
import { TokenMetadataProps } from ".";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { useAlchemyApi } from "hooks/useAlchemyCall";
import { TokenMetadataResponse } from "alchemy-sdk";
import { getTokenMetadata } from "api/etherApi";

function tokenMetadataExist(
  tokenMetadata: TokenMetadataResponse | undefined
): boolean {
  if (!tokenMetadata) return false;
  return !!tokenMetadata.logo || !!tokenMetadata.name || !!tokenMetadata.symbol;
}

export const TokenMetadata: FC<TokenMetadataProps> = ({ address }) => {
  const { data: tokenMetadata, loading } = useAlchemyApi(getTokenMetadata);

  const metadataExist = tokenMetadataExist(tokenMetadata);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      {metadataExist && (
        <Flex direction="row" alignItems="center">
          <Heading mr={4} size="md">
            Token Details
          </Heading>
          {tokenMetadata?.logo ? (
            <Image
              src={tokenMetadata?.logo}
              borderRadius="full"
              objectFit="cover"
              boxSize={6}
            />
          ) : (
            <Box borderRadius="full" boxSize={6} bgColor={"grey"} />
          )}{" "}
          {tokenMetadata?.name} ({tokenMetadata?.symbol})
        </Flex>
      )}{" "}
      {!metadataExist && <>No token related to this address</>}
    </>
  );
};
