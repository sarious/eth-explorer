import { FC, useEffect, useState } from "react";
import { RecenlyMinedBlockCardProps } from ".";
import {
  Card,
  CardBody,
  CardHeader,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { useAlchemy } from "../../../providers/Alchemy.provider";
import { Link } from "react-router-dom";

export const RecenlyMinedBlockCard: FC<RecenlyMinedBlockCardProps> = (
  props
) => {
  const [recentlyMinedBlock, setRecentlyMinedBlock] = useState<
    number | undefined
  >(undefined);

  const alchemy = useAlchemy();

  useEffect(() => {
    alchemy?.ws.on("block", (blockNumber) =>
      setRecentlyMinedBlock(blockNumber)
    );

    return () => {
      alchemy?.ws.removeAllListeners("block");
    };
  }, [alchemy?.ws]);

  return (
    <LinkBox as={Card} variant="filled" size="sm">
      <CardHeader>
        <LinkOverlay as={Link} to={`/blocks/${recentlyMinedBlock || "latest"}`}>
          Recently Mined Block
        </LinkOverlay>
      </CardHeader>
      <CardBody>{recentlyMinedBlock || "N/A"}</CardBody>
    </LinkBox>
  );
};
