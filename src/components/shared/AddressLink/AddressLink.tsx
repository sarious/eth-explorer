import { FC } from "react";
import { AddressLinkProps } from ".";
import { LinkWithRouter } from "../../ui/LinkWithRouter";
import { truncAddress } from "../../../utils/truncHash";

export const AddressLink: FC<AddressLinkProps> = ({ address, ...props }) => {
  return (
    <>
      {address && (
        <LinkWithRouter to={`/addresses/${address}`}>
          {truncAddress(address)}
        </LinkWithRouter>
      )}
    </>
  );
};
