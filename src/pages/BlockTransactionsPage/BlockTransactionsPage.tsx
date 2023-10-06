import { FC, useEffect } from "react";
import { BlockTransactionsPageProps } from ".";
import { useParams } from "react-router-dom";
import { Utils } from "alchemy-sdk";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { LinkWithRouter } from "components/ui/LinkWithRouter";
import { truncTxHash, parseHashOrTag } from "utils";
import { AddressLink } from "components/shared/AddressLink";
import { useAlchemyApi } from "hooks/useAlchemyCall";
import { getBlockWithTransactions } from "api/etherApi";
import { LoadingTable } from "components/ui/LoadingTable";
import * as path from "routing/path";

export const BlockTransactionsPage: FC<BlockTransactionsPageProps> = () => {
  const { blockHashOrBlockTag = "latest" } = useParams();

  const { loading, data, fetch } = useAlchemyApi((blockSearch: string) =>
    getBlockWithTransactions(parseHashOrTag(blockSearch))
  );

  useEffect(() => {
    fetch(blockHashOrBlockTag);
  }, [blockHashOrBlockTag]);

  return (
    <Card m={8}>
      <CardHeader>
        <Heading size="md">
          Transactions of block #{data?.number ?? blockHashOrBlockTag} (
          <Skeleton as="span" isLoaded={!loading} fitContent>
            {loading && "12"}
            {!loading && data?.transactions[0].confirmations}
          </Skeleton>{" "}
          confirmations)
        </Heading>
      </CardHeader>
      <CardBody>
        <Heading size="sm">
          Transactions Count:{" "}
          <Skeleton as="span" isLoaded={!loading} fitContent>
            {loading && "100"}
            {!loading && data?.transactions.length}
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
                data?.transactions.map((tx) => (
                  <Tr key={tx.hash}>
                    <Td>
                      <LinkWithRouter to={`/${path.transactions}/${tx.hash}`}>
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

          {loading && <LoadingTable />}
        </TableContainer>
      </CardBody>
    </Card>
  );
};
