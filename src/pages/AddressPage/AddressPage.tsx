import { FC, useEffect, useMemo } from "react";
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
import { useParams, Outlet, Link, useMatch } from "react-router-dom";
import { useAlchemyApi } from "hooks/useAlchemyCall";
import { isContractAddress } from "api/etherApi";
import * as path from "routing/path";

const tabs = {
  [path.details]: "Details",
  [path.tokens]: "Token Holdings",
  [path.nfts]: "NFTs Holdings",
};

export const AddressPage: FC<AddressPageProps> = () => {
  const { [path.addressParam]: address = "" } = useParams();

  const { data: isContract, loading } = useAlchemyApi(isContractAddress);

  const match = useMatch("addresses/:address/:tab");
  const initialIndex = match?.params.tab
    ? Math.max(Object.keys(tabs).indexOf(match.params.tab), 0)
    : 0;

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
        <Tabs mt={4} defaultIndex={initialIndex}>
          <TabList>
            {Object.keys(tabs).map((key) => (
              <Tab key={key} as={Link} to={key}>
                {tabs[key as keyof typeof tabs]}
              </Tab>
            ))}
          </TabList>
        </Tabs>

        <Outlet />
      </CardBody>
    </Card>
  );
};
