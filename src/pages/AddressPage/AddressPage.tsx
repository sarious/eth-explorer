import { FC, useEffect } from "react";
import { AddressPageProps } from ".";
import {
  Card,
  CardHeader,
  Heading,
  Skeleton,
  CardBody,
  Flex,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  Image,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { Utils } from "alchemy-sdk";
import { useParams, useNavigate, Outlet, Link } from "react-router-dom";
import { useAlchemyCall, useAlchemyApi } from "../../hooks/useAlchemyCall";
import { useAlchemy } from "../../providers/Alchemy.provider";

export const AddressPage: FC<AddressPageProps> = (props) => {
  const { address = "" } = useParams();

  const alchemy = useAlchemy();

  const { data: isContract, loading: isContractLoading } = useAlchemyCall(
    alchemy?.core.isContractAddress(address)
  );

  return (
    <Card m={8}>
      <CardHeader>
        <Heading as="span" size="md">
          <Skeleton as="span" isLoaded={!isContractLoading}>
            {isContract ? "Contract" : "Address"}{" "}
          </Skeleton>
          {address}
        </Heading>
      </CardHeader>
      <CardBody as={Flex} direction="column">
        {/* <Flex mt={4} gap={4}>
          <Button onClick={onTokensHoldingsClick}>Token Holdings</Button>
          <Button onClick={onNftHoldingsClick}>NFTs Holdings</Button>
        </Flex> */}

        <Tabs mt={4}>
          <TabList>
            <Tab as={Link} to="details">
              Details
            </Tab>
            <Tab as={Link} to="tokens">
              Token Holdings
            </Tab>
            <Tab as={Link} to="nfts">
              NFTs Holdings
            </Tab>
          </TabList>
        </Tabs>

        <Outlet />
      </CardBody>
    </Card>
  );
};
