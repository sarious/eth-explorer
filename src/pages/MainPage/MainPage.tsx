import { FC, useRef } from "react";
import { MainPageProps } from ".";
import { Flex, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const MainPage: FC<MainPageProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      const value = inputRef.current?.value;
      if (!value) return;

      const isHash = value.toLowerCase().startsWith("0x");
      const blockNumber = parseInt(value);
      const isNumber = !isNaN(blockNumber);
      const isAddress = isHash && value.length === 42;
      const isTxHash = isHash && value.length === 66;
      if (isNumber) {
        if (!isHash) {
          navigate(`/blocks/${value}`);
        } else if (isAddress) {
          navigate(`/addresses/${value}`);
        } else if (isTxHash) {
          navigate(`/transactions/${value}`);
        }
      }
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
