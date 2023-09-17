import { FC } from "react";
import { BlockLinkProps } from ".";
import { LinkWithRouter } from "../../ui/LinkWithRouter";

export const BlockLink: FC<BlockLinkProps> = ({ data }) => {
  return <LinkWithRouter to={`/blocks/${data}`}>{data}</LinkWithRouter>;
};
