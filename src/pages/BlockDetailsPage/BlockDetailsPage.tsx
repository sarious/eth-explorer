import { FC, useEffect, useState } from "react";
import {
  useParams,
  Link as ReactRouterLink,
  useNavigate,
} from "react-router-dom";
import { Link as ChakraLink, Skeleton, SkeletonText } from "@chakra-ui/react";
import { BlockDetailsPageProps } from ".";
import { useAlchemy } from "../../providers/Alchemy.provider";
import { BigNumber, Block } from "alchemy-sdk";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { LinkWithRouter } from "../../components/ui/LinkWithRouter";
import { AddressLink } from "../../components/shared/AddressLink";

export const BlockDetailsPage: FC<BlockDetailsPageProps> = (props) => {
  const [blockDetails, setBlockDetails] = useState<Block | null>(null);
  const [loading, setLoading] = useState(false);

  const { blockHashOrBlockTag = "latest" } = useParams();

  const alchemy = useAlchemy();

  useEffect(() => {
    async function getBlockInfo(blockSearch: string) {
      setLoading(true);
      const hash = blockSearch.toLowerCase().startsWith("0x");
      const blockNumber = parseInt(blockSearch);
      const blockHashOrTag =
        !isNaN(blockNumber) && !hash ? blockNumber : blockSearch;
      const block = await alchemy?.core.getBlock(blockHashOrTag);
      setLoading(false);
      if (!block) return;

      setBlockDetails(block);
    }

    getBlockInfo(blockHashOrBlockTag);
  }, [alchemy?.core, blockHashOrBlockTag]);

  const navigate = useNavigate();
  const navigateToPrevBlock = () => {
    if (blockDetails?.number && blockDetails?.number > 0) {
      navigate(`/blocks/${blockDetails?.number - 1}`);
    }
  };

  const navigateToNextBlock = () => {
    if (blockDetails) {
      navigate(`/blocks/${blockDetails?.number + 1}`);
    }
  };

  return (
    <>
      {blockDetails && (
        <Card m={8}>
          <CardHeader>
            <Flex>
              <Heading size="md">Block #{blockDetails?.number}</Heading>

              <IconButton
                aria-label="Select previous block"
                icon={<ChevronLeftIcon />}
                size="sm"
                ml={4}
                onClick={navigateToPrevBlock}
              />
              <IconButton
                aria-label="Select previous block"
                icon={<ChevronRightIcon />}
                size="sm"
                ml={2}
                onClick={navigateToNextBlock}
              />
            </Flex>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="1fr 3fr" gap={6}>
              <GridItem>Block Hash: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {blockDetails?.hash}
                </Skeleton>
              </GridItem>

              <GridItem>Hash of Parent Block: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  <ChakraLink
                    as={ReactRouterLink}
                    to={`/blocks/${blockDetails?.parentHash}`}
                    color="teal.500"
                  >
                    {blockDetails?.parentHash}
                  </ChakraLink>
                </Skeleton>
              </GridItem>

              <GridItem>Block Number: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {blockDetails?.number}
                </Skeleton>
              </GridItem>

              <GridItem>Timestamp: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {blockDetails?.timestamp}
                </Skeleton>
              </GridItem>

              <GridItem>Nonce: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {blockDetails?.nonce}
                </Skeleton>
              </GridItem>

              <GridItem>Transactions: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  <LinkWithRouter
                    to={`/blocks/${blockDetails.number}/transactions`}
                  >
                    {blockDetails?.transactions.length} transactions
                  </LinkWithRouter>
                </Skeleton>
              </GridItem>

              <GridItem>Difficulty: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {blockDetails?.difficulty}
                </Skeleton>
              </GridItem>

              <GridItem>Gas Limit: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {toNumberOrUndefined(blockDetails?.gasLimit)}
                </Skeleton>
              </GridItem>

              <GridItem>Gas Used: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {toNumberOrUndefined(blockDetails?.gasUsed)}
                </Skeleton>
              </GridItem>

              <GridItem>Base Fee Per Gas: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {toNumberOrUndefined(blockDetails?.baseFeePerGas)} wei
                </Skeleton>
              </GridItem>

              <GridItem>Miner Address: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  <AddressLink address={blockDetails?.miner} />
                </Skeleton>
              </GridItem>

              <GridItem>Extra Data: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {blockDetails?.extraData}
                </Skeleton>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export function toNumberOrUndefined(value: BigNumber | null | undefined) {
  if (value === null || value === undefined) return null;

  return value.toNumber();
}
