import { FC } from "react";
import { LoadingTableProps } from ".";
import { Stack, Skeleton } from "@chakra-ui/react";

export const LoadingTable: FC<LoadingTableProps> = ({ size = 10 }) => {
  return (
    <Stack>
      {[...Array(size)].map((v, i) => (
        <Skeleton key={i} height="30px" />
      ))}
    </Stack>
  );
};
