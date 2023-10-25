import { FC } from "react";
import { AddressLinkProps } from ".";
import { LinkWithRouter } from "components/ui/LinkWithRouter";
import { truncAddress } from "utils/truncHash";
import * as path from "routing/path";

export const AddressLink: FC<AddressLinkProps> = ({ address, short, ...props }) => {
  return (
    <>
      {address && (
        <LinkWithRouter to={`/${path.addresses}/${address}`}>
          {short ? truncAddress(address) : address}
        </LinkWithRouter>
      )}
    </>
  );
};
