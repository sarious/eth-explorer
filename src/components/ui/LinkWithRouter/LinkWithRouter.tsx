import { FC } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { LinkWithRouterProps } from ".";

export const LinkWithRouter: FC<LinkWithRouterProps> = ({
  children,
  ...props
}) => {
  return (
    <ChakraLink as={ReactRouterLink} {...props}>
      {children}
    </ChakraLink>
  );
};
