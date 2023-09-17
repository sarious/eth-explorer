import { FC, useEffect, useRef, useState } from "react";
import { MainPageProps } from ".";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Input,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { getNavigationPathBySearchValue } from "../../utils/getNavigationPathBySearchValue";
import { useAlchemy } from "../../providers/Alchemy.provider";

export const MainPage: FC<MainPageProps> = (props) => {
  const [recentlyMinedBlock, setRecentlyMinedBlock] = useState<
    number | undefined
  >(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const alchemy = useAlchemy();
  const navigate = useNavigate();

  useEffect(() => {
    async function getMindeBlockNumber() {
      const block = await alchemy?.core.getBlockNumber();
      if (!block) return;

      setRecentlyMinedBlock(block);
    }

    getMindeBlockNumber();
  }, [alchemy?.core]);

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      const value = inputRef.current?.value;
      if (!value) return;

      const navigationPath = getNavigationPathBySearchValue(value);
      if (!navigationPath) return;

      navigate(navigationPath);
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      direction="column"
      height="100vh"
      {...props}
    >
      <LinkBox as={Card} variant="filled" size="sm">
        <CardHeader>
          <LinkOverlay
            as={Link}
            to={`/blocks/${recentlyMinedBlock || "latest"}`}
          >
            Recently Mined Block
          </LinkOverlay>
        </CardHeader>
        <CardBody>{recentlyMinedBlock || "N/A"}</CardBody>
      </LinkBox>

      <Input
        ref={inputRef}
        placeholder="Tx Hash / Block Number / Address / Contract"
        size="lg"
        width="800px"
        onKeyDown={onKeyDown}
      />
    </Flex>
  );
};
