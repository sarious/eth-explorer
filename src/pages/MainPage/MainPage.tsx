import { FC } from "react";
import { MainPageProps } from ".";
import { Flex } from "@chakra-ui/react";
import { TotalInfoGroup } from "components/shared/TotalInfoGroup";
import { SearchBar } from 'components/shared/SearchBar';

export const MainPage: FC<MainPageProps> = (props) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      direction="column"
      height="100vh"
      m={4}
      {...props}
    >
      <TotalInfoGroup mb={4} />

      <SearchBar />
    </Flex>
  );
};
