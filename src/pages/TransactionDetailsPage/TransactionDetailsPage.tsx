import { FC, useEffect, useState } from "react";
import { TransactionDetailsPageProps } from ".";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import { useAlchemy } from "../../providers/Alchemy.provider";
import { useParams } from "react-router-dom";
import { TransactionResponse } from "alchemy-sdk";
import { toNumberOrUndefined } from "../BlockDetailsPage";
import { LinkWithRouter } from "../../components/ui/LinkWithRouter";
import { BlockLink } from "../../components/shared/BlockLink";
import { AddressLink } from "../../components/shared/AddressLink";

export const TransactionDetailsPage: FC<TransactionDetailsPageProps> = (
  props
) => {
  const alchemy = useAlchemy();

  const [transactionDetails, setTransactionDetails] =
    useState<TransactionResponse | null>(null);

  const { txHash = "" } = useParams();

  useEffect(() => {
    async function getBlockInfo(hash: string) {
      const transaction = await alchemy?.core.getTransaction(hash);
      console.log(transaction);
      const transaction1 = await alchemy?.core.getTransactionReceipts({
        blockNumber: "latest",
      });
      console.log("getTransactionReceipts", transaction1);
      if (!transaction) return;

      setTransactionDetails(transaction);
    }

    getBlockInfo(txHash);
  }, [alchemy?.core, txHash]);

  return (
    <Card m={8}>
      <CardHeader>
        <Flex>
          <Heading size="md">Transaction {transactionDetails?.hash}</Heading>
        </Flex>
      </CardHeader>
      <CardBody>
        <Grid templateColumns="1fr 3fr" gap={6}>
          <GridItem>Tx Hash: </GridItem>
          <GridItem>{transactionDetails?.hash}</GridItem>

          <GridItem>Confirmations: </GridItem>
          <GridItem>{transactionDetails?.confirmations}</GridItem>

          <GridItem>Block Number: </GridItem>
          <GridItem>
            <BlockLink data={transactionDetails?.blockNumber} />
          </GridItem>

          <GridItem>Block Hash: </GridItem>
          <GridItem>
            <BlockLink data={transactionDetails?.blockHash} />
          </GridItem>

          <GridItem>From: </GridItem>
          <GridItem>
            <AddressLink address={transactionDetails?.from} />
          </GridItem>

          <GridItem>To: </GridItem>
          <GridItem>
            <AddressLink address={transactionDetails?.to} />
          </GridItem>

          <GridItem>Nonce: </GridItem>
          <GridItem>{transactionDetails?.nonce}</GridItem>
          {/* 
          <GridItem>Data: </GridItem>
          <GridItem>{transactionDetails?.data}</GridItem> */}

          <GridItem>Gas Limit: </GridItem>
          <GridItem>
            {toNumberOrUndefined(transactionDetails?.gasLimit)}
          </GridItem>

          <GridItem>Gas Price: </GridItem>
          <GridItem>
            {toNumberOrUndefined(transactionDetails?.gasPrice)}
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};
