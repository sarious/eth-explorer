import { FC, useEffect } from "react";
import { NftDetailsPageProps } from ".";
import { useParams } from "react-router-dom";
import {
  Card,
  Flex,
  Heading,
  Image,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  Wrap,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useAlchemyApi } from "hooks/useAlchemyCall";
import { getNftMetadata } from "api/etherApi";
import * as path from "routing/path";
import { AddressLink } from "components/shared/AddressLink";
import { BlockLink } from "components/shared/BlockLink";

export const NftDetailsPage: FC<NftDetailsPageProps> = (props) => {
  const {
    [path.contractAddressParam]: contractAddress = "",
    [path.tokenIdParam]: tokenId = "",
  } = useParams();

  const { data: nft, loading, fetch } = useAlchemyApi(getNftMetadata);

  useEffect(() => {
    fetch(contractAddress, tokenId);
  }, [contractAddress, tokenId, fetch]);

  // TODO: calculate rarity with alchemy?.nft.computeRarity

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {nft && (
        <Flex direction="column">
          <Flex>
            <Card
              mr={8}
              p={2}
              as={Flex}
              alignItems="center"
              style={{ minWidth: "40vw", height: "100%" }}
            >
              {nft.rawMetadata?.image && (
                <Image
                  src={nft.rawMetadata?.image}
                  alt={`NFT ${nft.tokenId}`}
                  boxSize="40vw"
                  objectFit="contain"
                />
              )}
              {!nft.rawMetadata?.image && <Text>No image</Text>}
            </Card>
            <Flex direction="column" width={"60vw"}>
              <Heading>
                Title: {nft.title || nft.rawMetadata?.name || "N/A"}
              </Heading>
              <Text>
                Collection: {nft.contract.openSea?.collectionName || "N/A"}
              </Text>

              <Card mt={8}>
                <TableContainer>
                  <Table>
                    <Tbody>
                      <Tr>
                        <Td>Contract Address</Td>
                        <Td>
                          <AddressLink address={nft.contract.address} />
                        </Td>
                      </Tr>

                      <Tr>
                        <Td>Creator</Td>
                        <Td>
                          <AddressLink
                            address={nft.contract.contractDeployer}
                          />
                        </Td>
                      </Tr>

                      <Tr>
                        <Td>Deployed Block #</Td>
                        <Td>
                          {nft.contract.deployedBlockNumber ? (
                            <BlockLink
                              data={nft.contract.deployedBlockNumber}
                            />
                          ) : (
                            "N/A"
                          )}
                        </Td>
                      </Tr>

                      <Tr>
                        <Td>Token Id</Td>
                        <Td>{nft.tokenId}</Td>
                      </Tr>

                      <Tr>
                        <Td>Token Standard:</Td>
                        <Td>{nft.tokenType}</Td>
                      </Tr>

                      <Tr>
                        <Td>URL</Td>
                        <Td>
                          {nft.contract.openSea?.externalUrl ? (
                            <Link
                              href={nft.contract.openSea?.externalUrl}
                              isExternal
                            >
                              {nft.contract.openSea?.externalUrl}
                              <ExternalLinkIcon mx="2px" />
                            </Link>
                          ) : (
                            "N/A"
                          )}
                        </Td>
                      </Tr>

                      {nft.contract.openSea?.discordUrl && (
                        <Tr>
                          <Td>Discord URL</Td>
                          <Td>
                            <Link
                              href={nft.contract.openSea?.discordUrl}
                              isExternal
                            >
                              {nft.contract.openSea?.discordUrl}
                              <ExternalLinkIcon mx="2px" />
                            </Link>
                          </Td>
                        </Tr>
                      )}

                      {nft.timeLastUpdated && (
                        <Tr>
                          <Td>Last Updated</Td>
                          <Td>{nft.timeLastUpdated}</Td>
                        </Tr>
                      )}
                      {nft.description && (
                        <Tr>
                          <Td>Description</Td>
                          <Td whiteSpace="break-spaces" wordBreak="break-word">
                            {nft.description}
                          </Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Card>

              <Heading mt={8}>Rarity</Heading>
              <Wrap>
                {nft?.rawMetadata?.attributes?.map((attr) => (
                  <Card minWidth="100px" mr={4} mt={4}>
                    <Text p={4} bg="gray.100">
                      {attr.trait_type}
                    </Text>
                    <Text p={4}>{attr.value}</Text>
                  </Card>
                ))}
                {!nft?.rawMetadata?.attributes?.length && (
                  <Card mt={4} p={4} width="100%">
                    No rarity data available
                  </Card>
                )}
              </Wrap>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};
