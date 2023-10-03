import { FC } from "react";
import { AddressPageProps } from ".";
import {
  Card,
  CardHeader,
  Heading,
  Skeleton,
  CardBody,
  Flex,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { useParams, Outlet, Link } from "react-router-dom";
import { useAlchemyApi } from "../../hooks/useAlchemyCall";
import { isContractAddress } from "../../api/etherApi";

export const AddressPage: FC<AddressPageProps> = () => {
  const { address = "" } = useParams();

  const { data: isContract, loading } = useAlchemyApi(isContractAddress);

  return (
    <Card m={8}>
      <CardHeader>
        <Heading as="span" size="md">
          <Skeleton as="span" isLoaded={!loading}>
            {isContract ? "Contract" : "Address"}{" "}
          </Skeleton>
          {address}
        </Heading>
      </CardHeader>
      <CardBody as={Flex} direction="column">
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
