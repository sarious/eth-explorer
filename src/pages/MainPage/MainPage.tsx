import { FC, useRef } from "react";
import { MainPageProps } from ".";
import { Flex, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getNavigationPathBySearchValue } from "../../utils/getNavigationPathBySearchValue";

export const MainPage: FC<MainPageProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

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
    <Flex justifyContent="center" alignItems="center" height="100vh" {...props}>
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
