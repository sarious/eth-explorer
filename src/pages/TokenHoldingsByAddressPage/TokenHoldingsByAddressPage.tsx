import { FC } from "react";
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
import { useAlchemy } from "../../providers/Alchemy.provider";
import { truncString } from "../../utils/truncHash";
import { useAlchemyCall } from "../../hooks/useAlchemyCall";

export const TokenHoldingsByAddressPage: FC<TokenHoldingsByAddressPageProps> = (
  props
) => {
  const { address = "" } = useParams();

  const alchemy = useAlchemy();

  const { data: tokensResponse, loading: tokensLoading } = useAlchemyCall(
    alchemy?.core.getTokensForOwner(address)
  );

  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Token</Th>
              <Th>Balance</Th>
              <Th>Contract Address</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tokensResponse?.tokens.map((token) => (
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
                    to={`/addresses/${token.contractAddress}`}
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
    </>
  );
};