import { FC } from "react";
import { AddressLinkProps } from ".";
import { LinkWithRouter } from "../../ui/LinkWithRouter";
import { truncAddress } from "../../../utils/truncHash";
import * as path from "../../../routing/path";

export const AddressLink: FC<AddressLinkProps> = ({ address, ...props }) => {
  return (
    <>
      {address && (
        <LinkWithRouter to={`/${path.addresses}/${address}`}>
          {truncAddress(address)}
        </LinkWithRouter>
      )}
    </>
  );
};
