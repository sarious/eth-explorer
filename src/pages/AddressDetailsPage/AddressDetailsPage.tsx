import { FC, useEffect } from "react";
import { AddressDetailsPageProps } from ".";
import { useParams } from "react-router-dom";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Image,
  Box,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { TokenMetadataResponse } from "alchemy-sdk";
import { useAlchemyApi } from "../../hooks/useAlchemyCall";
import { Utils } from "alchemy-sdk";
import { getBalance, getTokenMetadata } from "../../api/etherApi";

function tokenMetadataExist(
  tokenMetadata: TokenMetadataResponse | undefined
): boolean {
  if (!tokenMetadata) return false;
  return !!tokenMetadata.logo || !!tokenMetadata.name || !!tokenMetadata.symbol;
}

export const AddressDetailsPage: FC<AddressDetailsPageProps> = (props) => {
  const { address = "" } = useParams();

  const {
    data: balance,
    loading: balanceLoading,
    fetch: fetchBalance,
  } = useAlchemyApi(getBalance);

  const {
    data: tokenMetadata,
    loading: metadataLoading,
    fetch: fetchMetadata,
  } = useAlchemyApi(getTokenMetadata);

  useEffect(() => {
    fetchMetadata(address);
    fetchBalance(address);
  }, [address]);

  const metadataExist = tokenMetadataExist(tokenMetadata);

  const balanceStr = balance
    ? Utils.formatUnits(balance, "ether") + " ETH"
    : "N/A";

  return (
    <TableContainer>
      <Table>
        <Tbody>
          <Tr>
            <Td>ETH Balance</Td>
            <Td>
              <Skeleton as="span" isLoaded={!balanceLoading}>
                {balanceLoading && "0.1234567891234567890 ETH"}
                {!balanceLoading && balanceStr}
              </Skeleton>
            </Td>
          </Tr>

          <Tr>
            <Td>Token Details</Td>
            <Td>
              <Skeleton as="span" isLoaded={!metadataLoading}>
                {metadataExist && (
                  <Flex>
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
                )}
                {!metadataExist && <>This is not contract of token.</>}
              </Skeleton>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
