import { FC, useEffect } from "react";
import { TransactionDetailsPageProps } from ".";
import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { BlockLink } from "components/shared/BlockLink";
import { AddressLink } from "components/shared/AddressLink";
import { useAlchemyApi } from "hooks/useAlchemyCall";
import { toNumberOrUndefined } from "utils/toNumberOrUndefined";
import { getTransaction } from "api/etherApi";
import * as path from "routing/path";

export const TransactionDetailsPage: FC<TransactionDetailsPageProps> = () => {
  const { [path.txHashParam]: txHash = "" } = useParams();

  const { data, loading, fetch } = useAlchemyApi(getTransaction);

  useEffect(() => {
    fetch(txHash);
  }, [txHash]);

  return (
    <Card>
      <CardHeader>
        <Heading as="span" size="md">
          Transaction {data?.hash ?? txHash}
        </Heading>
      </CardHeader>
      <CardBody>
        <Grid templateColumns="1fr 3fr" gap={6}>
          <GridItem>Tx Hash: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading &&
                "0x508bccc045eda9486a040d82fb63e6820f4cc1829bf59196988e4a15c85ee8a1"}
              {!loading && data?.hash}
            </Skeleton>
          </GridItem>

          <GridItem>Confirmations: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading && "000"}
              {!loading && data?.confirmations}
            </Skeleton>
          </GridItem>

          <GridItem>Block Number: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading && "18220930"}
              {!loading && <BlockLink data={data?.blockNumber} />}
            </Skeleton>
          </GridItem>

          <GridItem>Block Hash: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading &&
                "0x508bccc045eda9486a040d82fb63e6820f4cc1829bf59196988e4a15c85ee8a1"}
              {!loading && <BlockLink data={data?.blockHash} />}
            </Skeleton>
          </GridItem>

          <GridItem>From: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading && "0x77ad3a15b78101883AF36aD4A875e17c86AC65d1"}
              {!loading && <AddressLink address={data?.from} />}
            </Skeleton>
          </GridItem>

          <GridItem>To: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading && "0x77ad3a15b78101883AF36aD4A875e17c86AC65d1"}
              <AddressLink address={data?.to} />
            </Skeleton>
          </GridItem>

          <GridItem>Nonce: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading && "305374"}
              {data?.nonce}
            </Skeleton>
          </GridItem>
          {/*
          <GridItem>Data: </GridItem>
          <GridItem>{transactionDetails?.data}</GridItem> */}

          <GridItem>Gas Limit: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading && "173569"}
              {toNumberOrUndefined(data?.gasLimit)}
            </Skeleton>
          </GridItem>

          <GridItem>Gas Price: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading && "17122380146"}
              {toNumberOrUndefined(data?.gasPrice)}
            </Skeleton>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};
