import { ReactNode } from "react";
import { LinkProps as RouterLinkProps } from "react-router-dom";

export interface LinkWithRouterProps extends RouterLinkProps {
  children: ReactNode;
}
