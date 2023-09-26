import { FC, useEffect, useState } from "react";
import { NftDetailsPageProps } from ".";
import { useAlchemy } from "../../providers/Alchemy.provider";
import { useParams } from "react-router-dom";
import { Nft } from "alchemy-sdk";
import {
  Box,
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

export const NftDetailsPage: FC<NftDetailsPageProps> = (props) => {
  const [nft, setNftMetadata] = useState<Nft | undefined>();
  const [loading, setLoading] = useState(true);

  const alchemy = useAlchemy();
  const { contractAddress = "", tokenId = "" } = useParams();

  useEffect(() => {
    const fetchNFTMetadata = async () => {
      try {
        const nftMetadata = await alchemy?.nft.getNftMetadata(
          contractAddress,
          1
        );

        setNftMetadata(nftMetadata);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching NFT metadata:", error);
        setLoading(false);
      }
    };

    fetchNFTMetadata();
  }, [alchemy?.nft, contractAddress, tokenId]);

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
