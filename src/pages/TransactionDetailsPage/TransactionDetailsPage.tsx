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
import { useAlchemy } from "../../providers/Alchemy.provider";
import { useParams } from "react-router-dom";
import { toNumberOrUndefined } from "../BlockDetailsPage";
import { BlockLink } from "../../components/shared/BlockLink";
import { AddressLink } from "../../components/shared/AddressLink";
import { useAlchemyApi } from "../../hooks/useAlchemyCall";

export const TransactionDetailsPage: FC<TransactionDetailsPageProps> = (
  props
) => {
  const alchemy = useAlchemy();
  const { txHash = "" } = useParams();

  const {
    data: transactionDetails,
    loading,
    fetch,
  } = useAlchemyApi((hash: string) => alchemy.core.getTransaction(hash));

  useEffect(() => {
    fetch(txHash);
  }, [fetch, txHash]);

  return (
    <Card m={8}>
      <CardHeader>
        <Heading as="span" size="md">
          Transaction {transactionDetails?.hash ?? txHash}
        </Heading>
      </CardHeader>
      <CardBody>
        <Grid templateColumns="1fr 3fr" gap={6}>
          <GridItem>Tx Hash: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading &&
                "0x508bccc045eda9486a040d82fb63e6820f4cc1829bf59196988e4a15c85ee8a1"}
              {!loading && transactionDetails?.hash}
            </Skeleton>
          </GridItem>

          <GridItem>Confirmations: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading && "000"}
              {!loading && transactionDetails?.confirmations}
            </Skeleton>
          </GridItem>

          <GridItem>Block Number: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading && "18220930"}
              {!loading && <BlockLink data={transactionDetails?.blockNumber} />}
            </Skeleton>
          </GridItem>

          <GridItem>Block Hash: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading &&
                "0x508bccc045eda9486a040d82fb63e6820f4cc1829bf59196988e4a15c85ee8a1"}
              {!loading && <BlockLink data={transactionDetails?.blockHash} />}
            </Skeleton>
          </GridItem>

          <GridItem>From: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading && "0x77ad3a15b78101883AF36aD4A875e17c86AC65d1"}
              {!loading && <AddressLink address={transactionDetails?.from} />}
            </Skeleton>
          </GridItem>

          <GridItem>To: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading && "0x77ad3a15b78101883AF36aD4A875e17c86AC65d1"}
              <AddressLink address={transactionDetails?.to} />
            </Skeleton>
          </GridItem>

          <GridItem>Nonce: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading && "305374"}
              {transactionDetails?.nonce}
            </Skeleton>
          </GridItem>
          {/*
          <GridItem>Data: </GridItem>
          <GridItem>{transactionDetails?.data}</GridItem> */}

          <GridItem>Gas Limit: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading && "173569"}
              {toNumberOrUndefined(transactionDetails?.gasLimit)}
            </Skeleton>
          </GridItem>

          <GridItem>Gas Price: </GridItem>
          <GridItem>
            <Skeleton isLoaded={!loading} fitContent>
              {loading && "17122380146"}
              {toNumberOrUndefined(transactionDetails?.gasPrice)}
            </Skeleton>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};
