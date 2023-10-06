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

export const NftDetailsPage: FC<NftDetailsPageProps> = (props) => {
  const { contractAddress = "", tokenId = "" } = useParams();

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
        <Flex direction="column" m={8}>
          <Flex>
            <Card mr={8} as={Flex} justifyContent="center" alignItems="center">
              {nft.rawMetadata?.image && (
                <Image
                  src={nft.rawMetadata?.image}
                  alt={`NFT ${nft.tokenId}`}
                  boxSize="400px"
                  objectFit="contain"
                />
              )}
            </Card>
            <Flex direction="column">
              <Heading>{nft.title || nft.rawMetadata?.name}</Heading>
              <Text>{nft.contract.openSea?.collectionName}</Text>

              <Card mt={8}>
                <TableContainer>
                  <Table>
                    <Tbody>
                      <Tr>
                        <Td>Contract Address</Td>
                        <Td>{nft.contract.address}</Td>
                      </Tr>

                      <Tr>
                        <Td>Creator</Td>
                        <Td>{nft.contract.contractDeployer}</Td>
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
                          <Link
                            href={nft.contract.openSea?.externalUrl}
                            isExternal
                            color="teal.500"
                          >
                            {nft.contract.openSea?.externalUrl}
                            <ExternalLinkIcon mx="2px" />
                          </Link>
                        </Td>
                      </Tr>

                      {nft.contract.openSea?.discordUrl && (
                        <Tr>
                          <Td>Discord URL</Td>
                          <Td>
                            <Link
                              href={nft.contract.openSea?.discordUrl}
                              isExternal
                              color="teal.500"
                            >
                              {nft.contract.openSea?.discordUrl}
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
                          <Td>{nft.description}</Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Card>
            </Flex>
          </Flex>
          <Wrap mt={8}>
            {nft?.rawMetadata?.attributes?.map((attr) => (
              <Card minWidth="100px" mr={4}>
                <Text>{attr.trait_type}</Text>
                <Text>{attr.value}</Text>
              </Card>
            ))}
          </Wrap>
        </Flex>
      )}
    </>
  );
};
