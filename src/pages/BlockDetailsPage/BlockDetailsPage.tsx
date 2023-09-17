import { FC, useEffect, useState } from "react";
import {
  useParams,
  Link as ReactRouterLink,
  useNavigate,
} from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
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

  const { blockHashOrBlockTag = "latest" } = useParams();

  const alchemy = useAlchemy();

  useEffect(() => {
    async function getBlockInfo(blockSearch: string) {
      const hash = blockSearch.toLowerCase().startsWith("0x");
      const blockNumber = parseInt(blockSearch);
      const blockHashOrTag =
        !isNaN(blockNumber) && !hash ? blockNumber : blockSearch;
      const block = await alchemy?.core.getBlock(blockHashOrTag);
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
              <GridItem>{blockDetails?.hash}</GridItem>

              <GridItem>Hash of Parent Block: </GridItem>
              <GridItem>
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/blocks/${blockDetails?.parentHash}`}
                  color="teal.500"
                >
                  {blockDetails?.parentHash}
                </ChakraLink>
              </GridItem>

              <GridItem>Block Number: </GridItem>
              <GridItem>{blockDetails?.number}</GridItem>

              <GridItem>Timestamp: </GridItem>
              <GridItem>{blockDetails?.timestamp}</GridItem>

              <GridItem>Nonce: </GridItem>
              <GridItem>{blockDetails?.nonce}</GridItem>

              <GridItem>Transactions: </GridItem>
              <GridItem>
                <LinkWithRouter
                  to={`/blocks/${blockDetails.number}/transactions`}
                >
                  {blockDetails?.transactions.length} transactions
                </LinkWithRouter>
              </GridItem>

              <GridItem>Difficulty: </GridItem>
              <GridItem>{blockDetails?.difficulty}</GridItem>

              <GridItem>Gas Limit: </GridItem>
              <GridItem>{toNumberOrUndefined(blockDetails?.gasLimit)}</GridItem>

              <GridItem>Gas Used: </GridItem>
              <GridItem>{toNumberOrUndefined(blockDetails?.gasUsed)}</GridItem>

              <GridItem>Base Fee Per Gas: </GridItem>
              <GridItem>
                {toNumberOrUndefined(blockDetails?.baseFeePerGas)} wei
              </GridItem>

              <GridItem>Miner Address: </GridItem>
              <GridItem>
                <AddressLink address={blockDetails?.miner} />
              </GridItem>

              <GridItem>Extra Data: </GridItem>
              <GridItem>{blockDetails?.extraData}</GridItem>
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
