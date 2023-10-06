import { FC, useEffect, useState } from "react";
import { RecenlyMinedBlockCardProps } from ".";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useAlchemy } from "../../../providers/Alchemy.provider";
import { Link } from "react-router-dom";
import * as path from "../../../routing/path";

export const RecenlyMinedBlockCard: FC<RecenlyMinedBlockCardProps> = () => {
  const [recentlyMinedBlock, setRecentlyMinedBlock] = useState<
    number | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);

  const alchemy = useAlchemy();

  useEffect(() => {
    setLoading(true);
    alchemy?.ws.on("block", (blockNumber) => {
      setRecentlyMinedBlock(blockNumber);
      setLoading(false);
    });

    return () => {
      alchemy?.ws.removeAllListeners("block");
    };
  }, [alchemy?.ws]);

  return (
    <LinkBox as={Card} variant="filled" size="sm">
      <CardHeader>
        <LinkOverlay
          as={Link}
          to={`/${path.blocks}/${recentlyMinedBlock || "latest"}`}
        >
          <Heading size="md">Recently Mined Block</Heading>
        </LinkOverlay>
      </CardHeader>
      <CardBody>
        <Text as={Flex} fontSize="xl">
          #
          <Skeleton isLoaded={!loading}>{recentlyMinedBlock || "N/A"}</Skeleton>
        </Text>
      </CardBody>
    </LinkBox>
  );
};
