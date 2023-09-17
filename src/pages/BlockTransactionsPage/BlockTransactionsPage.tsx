import { FC, useEffect, useState } from "react";
import { BlockTransactionsPageProps } from ".";
import { useParams } from "react-router-dom";
import { useAlchemy } from "../../providers/Alchemy.provider";
import { BlockWithTransactions, Utils } from "alchemy-sdk";
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
import { LinkWithRouter } from "../../components/ui/LinkWithRouter";
import { truncAddress, truncTxHash } from "../../utils/truncHash";

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
                  <Td>
                    <LinkWithRouter to={`/transactions/${tx.hash}`}>
                      {truncTxHash(tx.hash)}
                    </LinkWithRouter>
                  </Td>
                  <Td>
                    <LinkWithRouter to={`/addresses/${tx.from}`}>
                      {truncAddress(tx.from)}
                    </LinkWithRouter>
                  </Td>
                  <Td>
                    <LinkWithRouter to={`/addresses/${tx.to}`}>
                      {truncAddress(tx.to)}
                    </LinkWithRouter>
                  </Td>
                  <Td>
                    {tx.value ? (
                      <> {Utils.formatUnits(tx.value, "ether")} ETH</>
                    ) : (
                      "-"
                    )}
                  </Td>
                  <Td>
                    {tx.gasPrice ? (
                      <> {Utils.formatUnits(tx.gasPrice, "gwei")} Gwei</>
                    ) : (
                      "-"
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};
