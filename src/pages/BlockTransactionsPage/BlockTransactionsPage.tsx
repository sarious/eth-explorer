import { FC, useEffect, useState } from "react";
import { BlockTransactionsPageProps } from ".";
import { useParams } from "react-router-dom";
import { useAlchemy } from "../../providers/Alchemy.provider";
import { BlockWithTransactions } from "alchemy-sdk";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { toNumberOrUndefined } from "../BlockDetailsPage";
import { LinkWithRouter } from "../../components/LinkWithRouter";

export const BlockTransactionsPage: FC<BlockTransactionsPageProps> = (
  props
) => {
  const [blockWithTransactions, setBlockWithTransactions] =
    useState<BlockWithTransactions | null>(null);

  const { blockHashOrBlockTag = "latest" } = useParams();

  const alchemy = useAlchemy();

  useEffect(() => {
    async function getBlockInfo(blockSearch: string) {
      const hash = blockSearch.toLowerCase().startsWith("0x");
      const blockNumber = parseInt(blockSearch);
      const blockHashOrTag =
        !isNaN(blockNumber) && !hash ? blockNumber : blockSearch;
      const block = await alchemy?.core.getBlockWithTransactions(
        blockHashOrTag
      );
      console.log(block);
      if (!block) return;

      setBlockWithTransactions(block);
    }

    getBlockInfo(blockHashOrBlockTag);
  }, [alchemy?.core, blockHashOrBlockTag]);

  return (
    <Card m={8}>
      <CardHeader>
        <Heading size="md">
          Transactions of block #{blockWithTransactions?.number} (
          {blockWithTransactions?.transactions[0].confirmations} confirmations)
        </Heading>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Hash</Th>
                <Th>From</Th>
                <Th>To</Th>
                <Th>Value</Th>
                <Th>Gas Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {blockWithTransactions?.transactions.map((tx) => (
                <Tr key={tx.hash}>
                  <Td>{tx.hash}</Td>
                  <Td>
                    <LinkWithRouter to={`/addresses/${tx.from}`}>
                      {tx.from}
                    </LinkWithRouter>
                  </Td>
                  <Td>
                    <LinkWithRouter to={`/addresses/${tx.to}`}>
                      {tx.to}
                    </LinkWithRouter>
                  </Td>
                  <Td>{tx.value.toString()}</Td>
                  <Td>{tx.gasPrice?.toString()} wei</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};
