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
  console.log("AddressDetailsPage", address);

  const alchemy = useAlchemy();

  const { data: tokensResponse, loading: tokensLoading } = useAlchemyCall(
    alchemy?.core.getTokensForOwner(address)
  );

  const { data: isContract, loading: isContractLoading } = useAlchemyCall(
    alchemy?.core.isContractAddress(address)
  );

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

  const navigate = useNavigate();
  const onNftHoldingsClick = () => {
    navigate("nft/");
  };
  const onTokensHoldingsClick = () => {
    navigate("tokens/");
  };

  return (
    <Card m={8}>
      <CardHeader>
        <Heading as="span" size="md">
          <Skeleton as="span" isLoaded={!isContractLoading}>
            {isContract ? "Contract" : "Address"}{" "}
          </Skeleton>
          {address}
        </Heading>
      </CardHeader>
      <CardBody as={Flex} direction="column">
        <TableContainer>
          <Table>
            <Tbody>
              <Tr>
                <Td>ETH Balance</Td>
                <Td>
                  <Skeleton as="span" isLoaded={!balanceLoading}>
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
                          <Box
                            borderRadius="full"
                            boxSize={6}
                            bgColor={"grey"}
                          />
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

        <Flex mt={4} gap={4}>
          <Button onClick={onTokensHoldingsClick}>Token Holdings</Button>
          <Button onClick={onNftHoldingsClick}>NFTs Holdings</Button>
        </Flex>
      </CardBody>
    </Card>
  );
};
