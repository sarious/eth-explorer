import { FC, useEffect } from "react";
import {
  useParams,
  Link as ReactRouterLink,
  useNavigate,
} from "react-router-dom";
import { Link as ChakraLink, Skeleton } from "@chakra-ui/react";
import { BlockDetailsPageProps } from ".";
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
import { LinkWithRouter } from "components/ui/LinkWithRouter";
import { AddressLink } from "components/shared/AddressLink";
import { useAlchemyApi } from "hooks/useAlchemyCall";
import { getBlock } from "api/etherApi";
import { parseHashOrTag, toNumberOrUndefined } from "utils";
import * as path from "routing/path";

export const BlockDetailsPage: FC<BlockDetailsPageProps> = (props) => {
  const { [path.blockHashOrBlockTagParam]: blockHashOrBlockTag = "latest" } =
    useParams();

  const { loading, data, fetch } = useAlchemyApi((blockSearch: string) =>
    getBlock(parseHashOrTag(blockSearch))
  );

  useEffect(() => {
    fetch(blockHashOrBlockTag);
  }, [blockHashOrBlockTag]);

  const navigate = useNavigate();
  const navigateToPrevBlock = () => {
    if (data?.number && data?.number > 0) {
      navigate(`/${path.blocks}/${data?.number - 1}`);
    }
  };

  const navigateToNextBlock = () => {
    if (data) {
      navigate(`/${path.blocks}/${data?.number + 1}`);
    }
  };

  return (
    <>
      {
        <Card m={8}>
          <CardHeader>
            <Flex>
              <Heading size="md">Block #{data?.number}</Heading>

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
                  {data?.hash}
                </Skeleton>
              </GridItem>

              <GridItem>Hash of Parent Block: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  <ChakraLink
                    as={ReactRouterLink}
                    to={`/${path.blocks}/${data?.parentHash}`}
                    color="teal.500"
                  >
                    {data?.parentHash}
                  </ChakraLink>
                </Skeleton>
              </GridItem>

              <GridItem>Block Number: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {data?.number}
                </Skeleton>
              </GridItem>

              <GridItem>Timestamp: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {data?.timestamp}
                </Skeleton>
              </GridItem>

              <GridItem>Nonce: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {data?.nonce}
                </Skeleton>
              </GridItem>

              <GridItem>Transactions: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {data && (
                    <LinkWithRouter
                      to={`/${path.blocks}/${data.number}/${path.transactions}`}
                    >
                      {data?.transactions.length} transactions
                    </LinkWithRouter>
                  )}
                </Skeleton>
              </GridItem>

              <GridItem>Difficulty: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {data?.difficulty}
                </Skeleton>
              </GridItem>

              <GridItem>Gas Limit: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {toNumberOrUndefined(data?.gasLimit)}
                </Skeleton>
              </GridItem>

              <GridItem>Gas Used: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {toNumberOrUndefined(data?.gasUsed)}
                </Skeleton>
              </GridItem>

              <GridItem>Base Fee Per Gas: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {toNumberOrUndefined(data?.baseFeePerGas)} wei
                </Skeleton>
              </GridItem>

              <GridItem>Miner Address: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  <AddressLink address={data?.miner} />
                </Skeleton>
              </GridItem>

              <GridItem>Extra Data: </GridItem>
              <GridItem>
                <Skeleton isLoaded={!loading} fitContent={true}>
                  {data?.extraData}
                </Skeleton>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      }
    </>
  );
};
