import { FC, useEffect } from "react";
import { TokenHoldingsByAddressPageProps } from ".";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Box,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { truncString } from "utils/truncHash";
import { useAlchemyApi } from "hooks/useAlchemyCall";
import { getTokensForOwner } from "api/etherApi";
import { LoadingTable } from "components/ui/LoadingTable";
import * as path from "routing/path";

export const TokenHoldingsByAddressPage: FC<
  TokenHoldingsByAddressPageProps
> = () => {
  const { address = "" } = useParams();

  const { data, loading, fetch } = useAlchemyApi(getTokensForOwner);

  useEffect(() => {
    fetch(address);
  }, [address, fetch]);

  return (
    <>
      <TableContainer>
        <Table size="sm" variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Token</Th>
              <Th>Balance</Th>
              <Th>Contract Address</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.tokens.map((token) => (
              <Tr key={token.contractAddress}>
                <Td display="flex" alignItems="center" gap={4}>
                  {token?.logo ? (
                    <Image
                      src={token?.logo}
                      borderRadius="full"
                      objectFit="cover"
                      boxSize={6}
                    />
                  ) : (
                    <Box borderRadius="full" boxSize={6} bgColor={"grey"} />
                  )}{" "}
                  {truncString(token.name, 20, "end")}
                </Td>
                <Td>
                  {token.balance} {token.symbol}
                </Td>
                <Td>
                  <ChakraLink
                    as={Link}
                    to={`/${path.addresses}/${token.contractAddress}`}
                    color="teal.500"
                  >
                    {token.contractAddress}
                  </ChakraLink>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {loading && <LoadingTable />}
    </>
  );
};
