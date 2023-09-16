import { FC, useEffect, useState } from "react";
import { AddressDetailsPageProps } from ".";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import { useAlchemy } from "../../providers/Alchemy.provider";
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
import { GetTokensForOwnerResponse } from "alchemy-sdk";
import { truncString } from "../../utils/truncHash";

export const AddressDetailsPage: FC<AddressDetailsPageProps> = (props) => {
  const [tokensResponse, setTokensResponse] =
    useState<GetTokensForOwnerResponse | null>(null);

  const { address = "" } = useParams();

  const alchemy = useAlchemy();

  useEffect(() => {
    async function getAddressInfo(address: string) {
      const tokensResponse = await alchemy?.core.getTokensForOwner(address);
      if (!tokensResponse) return;

      setTokensResponse(tokensResponse);
    }

    getAddressInfo(address);
  }, [alchemy?.core, address]);

  return (
    <TableContainer m={8}>
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
                  as={ReactRouterLink}
                  to={`/tokens/${token.contractAddress}`}
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
  );
};
