import { FC } from "react";
import { AddressDetailsPageProps } from ".";
import {
  useParams,
  Link as ReactRouterLink,
  useNavigate,
  Outlet,
  Link,
} from "react-router-dom";
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
  CardHeader,
  CardBody,
  Card,
  Heading,
  Flex,
  Button,
  Tabs,
  Tab,
  TabList,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { TokenMetadataResponse } from "alchemy-sdk";
import { TokenMetadata } from "../../components/shared/TokenMetadata";
import { useAlchemyCall } from "../../hooks/useAlchemyCall";

export const AddressDetailsPage: FC<AddressDetailsPageProps> = (props) => {
  const { address = "" } = useParams();
  console.log("AddressDetailsPage", address);

  const alchemy = useAlchemy();

  const { data: tokensResponse, loading: tokensLoading } = useAlchemyCall(
    alchemy?.core.getTokensForOwner(address)
  );

  const { data: isContract, loading: isContractLoading } = useAlchemyCall(
    alchemy?.core.isContractAddress(address)
  );

  const { data: balance, loading: balanceLoading } = useAlchemyCall(
    alchemy?.core.getBalance(address)
  );

  const navigate = useNavigate();
  const onNftHoldingsClick = () => {
    navigate("nft/");
  };

  return (
    <Card m={8}>
      <CardHeader>
        <Heading as={Flex} size="md" direction="row" gap="4">
          <Skeleton isLoaded={!isContractLoading}>
            {isContract ? "Contract" : "Address"}{" "}
          </Skeleton>
          <Text>{address}</Text>
        </Heading>
      </CardHeader>
      <CardBody as={Flex} direction="column">
        <Box>
          ETH Balance:{" "}
          <>
            <Skeleton isLoaded={!balanceLoading}>
              <Box>
                {!balanceLoading && <>{balance?.toString() ?? "N/a"} wei</>}
              </Box>
            </Skeleton>
          </>
        </Box>
        <TokenMetadata address={address} />
        <Button onClick={onNftHoldingsClick}>NFTs Holdings</Button>
      </CardBody>
    </Card>
  );
};
