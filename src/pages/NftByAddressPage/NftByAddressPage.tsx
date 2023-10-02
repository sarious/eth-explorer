import { FC, useEffect, useState } from "react";
import { NftByAddressPageProps } from ".";
import { useAlchemy } from "../../providers/Alchemy.provider";
import { useNavigate, useParams } from "react-router-dom";
import { OwnedNftsResponse } from "alchemy-sdk";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AddressLink } from "../../components/shared/AddressLink";

export const NftByAddressPage: FC<NftByAddressPageProps> = (props) => {
  const [nfts, setNFTs] = useState<OwnedNftsResponse>();
  const [loading, setLoading] = useState(true);

  const alchemy = useAlchemy();
  const { address = "" } = useParams();

  useEffect(() => {
    const fetchNFTsForAddress = async () => {
      try {
        const nftCollection = await alchemy?.nft.getNftsForOwner(address);
        if (!nftCollection) return;

        setNFTs(nftCollection);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching NFTs for address:", error);
        setLoading(false);
      }
    };

    fetchNFTsForAddress();
  }, [address, alchemy?.nft]);

  const navigate = useNavigate();
  const nftDetailsClick = (contractAddress: string, tokenId: string) => {
    navigate(`/nft/${contractAddress}/${tokenId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Text>Total Count: {nfts?.totalCount}</Text>
      <TableContainer>
        <Table size="sm" variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th maxWidth={70}>Token Id</Th>
              <Th>Qty</Th>
              <Th>Title</Th>
              <Th>Type</Th>
              <Th>Contract Address</Th>
              <Th>Contract Deployer</Th>
              <Th>Deployed Block #</Th>
              <Th>Last Updated</Th>
            </Tr>
          </Thead>
          <Tbody>
            {nfts?.ownedNfts.map((nft, index) => (
              <Tr key={index}>
                <Td maxWidth={70} overflow="hidden" textOverflow="ellipsis">
                  {nft.tokenId}
                </Td>
                <Td>{nft.balance}</Td>
                <Td
                  onClick={() =>
                    nftDetailsClick(nft.contract.address, nft.tokenId)
                  }
                >
                  <Flex>
                    {nft.contract.openSea?.imageUrl && (
                      <img
                        src={nft.contract.openSea?.imageUrl}
                        alt={`NFT ${nft.tokenId}`}
                        width="60"
                        height="60"
                      />
                    )}
                    <Flex direction="column" justifyContent="center">
                      <div>{nft.title}</div>
                      <div>{nft.contract?.openSea?.collectionName}</div>
                    </Flex>
                  </Flex>
                </Td>
                <Td>{nft.tokenType}</Td>
                <Td>
                  <AddressLink address={nft.contract.address} />
                </Td>
                <Td>
                  <AddressLink address={nft.contract.contractDeployer} />
                </Td>
                <Td>{nft.contract.deployedBlockNumber}</Td>
                <Td>{nft.timeLastUpdated}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
