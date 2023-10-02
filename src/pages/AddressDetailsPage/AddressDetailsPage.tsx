import { FC, useEffect } from "react";
import { AddressDetailsPageProps } from ".";
import { useParams, useNavigate } from "react-router-dom";
import { useAlchemy } from "../../providers/Alchemy.provider";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Image,
  Box,
  CardHeader,
  CardBody,
  Card,
  Heading,
  Flex,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { TokenMetadataResponse } from "alchemy-sdk";
import { useAlchemyApi, useAlchemyCall } from "../../hooks/useAlchemyCall";
import { Utils } from "alchemy-sdk";

function tokenMetadataExist(
  tokenMetadata: TokenMetadataResponse | undefined
): boolean {
  if (!tokenMetadata) return false;
  return !!tokenMetadata.logo || !!tokenMetadata.name || !!tokenMetadata.symbol;
}

export const AddressDetailsPage: FC<AddressDetailsPageProps> = (props) => {
  const { address = "" } = useParams();

  const alchemy = useAlchemy();

  const { data: balance, loading: balanceLoading } = useAlchemyCall(
    alchemy?.core.getBalance(address)
  );

  const {
    data: tokenMetadata,
    loading: metadataLoading,
    fetch: fetchMetadata,
  } = useAlchemyApi((address: string) =>
    alchemy?.core.getTokenMetadata(address)
  );

  useEffect(() => {
    fetchMetadata(address);
  }, [fetchMetadata, address]);

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
                {!metadataExist && <>No token related to this address</>}
              </Skeleton>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
