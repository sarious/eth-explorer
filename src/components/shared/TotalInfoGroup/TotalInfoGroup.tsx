import { FC } from "react";
import { TotalInfoGroupProps } from ".";
import { Flex } from "@chakra-ui/react";
import { RecenlyMinedBlockCard } from "../RecenlyMinedBlockCard";

export const TotalInfoGroup: FC<TotalInfoGroupProps> = (props) => {
  return (
    <Flex>
      <RecenlyMinedBlockCard />
    </Flex>
  );
};
