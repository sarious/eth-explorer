import { ReactNode } from "react";
import { ChakraProvider, extendBaseTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendBaseTheme({
  colors,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
