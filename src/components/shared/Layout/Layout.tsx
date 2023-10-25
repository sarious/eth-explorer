import { FC } from "react";
import { LayoutProps } from ".";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { SearchBar } from "../SearchBar";
import { RecenlyMinedBlockCard } from "../RecenlyMinedBlockCard";

export const Layout: FC<LayoutProps> = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      m={4}
      gap={4}
    >
      <Flex gap={4} justifyContent="center" alignItems="center" width="100%">
        <RecenlyMinedBlockCard showTitle={false} />
        <SearchBar />
      </Flex>

      <Flex
        justifyContent="center"
        alignItems="stretch"
        direction="column"
        width="100%"
      >
        <Outlet />
      </Flex>
    </Flex>
  );
};
