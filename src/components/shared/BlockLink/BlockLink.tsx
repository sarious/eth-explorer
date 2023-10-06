import { FC } from "react";
import { BlockLinkProps } from ".";
import { LinkWithRouter } from "../../ui/LinkWithRouter";
import * as path from "../../../routing/path";

export const BlockLink: FC<BlockLinkProps> = ({ data }) => {
  return <LinkWithRouter to={`/${path.blocks}/${data}`}>{data}</LinkWithRouter>;
};
