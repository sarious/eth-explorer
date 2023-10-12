import { FC, useEffect } from "react";
import { NftByAddressPageProps } from ".";
import { useNavigate, useParams } from "react-router-dom";
import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Image,
  Box,
} from "@chakra-ui/react";
import { AddressLink } from "components/shared/AddressLink";
import { LoadingTable } from "components/ui/LoadingTable";
import { useAlchemyApi } from "hooks/useAlchemyCall";
import { getNftsForOwner } from "api/etherApi";
import * as path from "routing/path";

export const NftByAddressPage: FC<NftByAddressPageProps> = (props) => {
  const { address = "" } = useParams();

  const { data: nfts, loading, fetch } = useAlchemyApi(getNftsForOwner);

  useEffect(() => {
    fetch(address);
  }, [address, fetch]);

  const navigate = useNavigate();
  const nftDetailsClick = (contractAddress: string, tokenId: string) => {
    navigate(`/${path.nfts}/${contractAddress}/${tokenId}`);
  };

  return (
    <>
      <Text>Total Count: {nfts?.totalCount}</Text>
      <TableContainer>
        <Table variant="mytable">
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
              <Tr
                key={index}
                onClick={() =>
                  nftDetailsClick(nft.contract.address, nft.tokenId)
                }
                cursor="pointer"
              >
                <Td maxWidth={70} overflow="hidden" textOverflow="ellipsis">
                  {nft.tokenId}
                </Td>
                <Td>{nft.balance}</Td>
                <Td>
                  <Flex>
                    {nft.contract.openSea?.imageUrl && (
                      <Image
                        src={nft.contract.openSea?.imageUrl}
                        alt={`NFT ${nft.tokenId}`}
                        boxSize={12}
                      />
                    )}
                    <Flex direction="column" justifyContent="center">
                      <Box>{nft.title}</Box>
                      <Box>{nft.contract?.openSea?.collectionName}</Box>
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

      {loading && <LoadingTable />}
    </>
  );
};
