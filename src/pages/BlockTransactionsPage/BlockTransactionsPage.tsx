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
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { LinkWithRouter } from "../../components/ui/LinkWithRouter";
import { truncTxHash } from "../../utils/truncHash";
import { AddressLink } from "../../components/shared/AddressLink";

export const BlockTransactionsPage: FC<BlockTransactionsPageProps> = (
  props
) => {
  const [blockWithTransactions, setBlockWithTransactions] =
    useState<BlockWithTransactions | null>(null);
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
      const block = await alchemy?.core.getBlockWithTransactions(
        blockHashOrTag
      );
      setLoading(false);
      if (!block) return;

      setBlockWithTransactions(block);
    }

    getBlockInfo(blockHashOrBlockTag);
  }, [alchemy?.core, blockHashOrBlockTag]);

  return (
    <Card m={8}>
      <CardHeader>
        <Heading size="md">
          Transactions of block #
          {blockWithTransactions?.number ?? blockHashOrBlockTag} (
          <Skeleton as="span" isLoaded={!loading} fitContent>
            {loading && "12"}
            {!loading && blockWithTransactions?.transactions[0].confirmations}
          </Skeleton>{" "}
          confirmations)
        </Heading>
      </CardHeader>
      <CardBody>
        <Heading size="sm">
          Transactions Count:{" "}
          <Skeleton as="span" isLoaded={!loading} fitContent>
            {loading && "100"}
            {!loading && blockWithTransactions?.transactions.length}
          </Skeleton>
        </Heading>
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
              {!loading &&
                blockWithTransactions?.transactions.map((tx) => (
                  <Tr key={tx.hash}>
                    <Td>
                      <LinkWithRouter to={`/transactions/${tx.hash}`}>
                        {truncTxHash(tx.hash)}
                      </LinkWithRouter>
                    </Td>
                    <Td>
                      <AddressLink address={tx.from} />
                    </Td>
                    <Td>
                      <AddressLink address={tx.to} />
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
          {loading && (
            <Stack>
              {[...Array(10)].map(() => (
                <Skeleton height="30px" />
              ))}
            </Stack>
          )}
        </TableContainer>
      </CardBody>
    </Card>
  );
};
