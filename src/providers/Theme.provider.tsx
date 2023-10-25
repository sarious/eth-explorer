import { ReactNode } from "react";
import {
  ChakraProvider,
  extendBaseTheme,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";

const customTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: "teal" }),
  {
    components: {
      Table: {
        defaultProps: {
          size: "sm",
          variant: "striped",
          colorScheme: "gray",
        },
        variants: {
          mytable: {
            tr: {
              _odd: {
                background: "gray.100",
              },
              _hover: {
                background: "gray.200",
              },
            },
          },
        },
      },
      Link: {
        baseStyle: {
          color: "teal.500",
          textDecoration: "none",
          _hover: {
            textDecoration: "underline",
          },
        }
      },
      Td: {
        baseStyle: {
          fontWeight: "bold",
          textTransform: "uppercase",
          borderRadius: "base",
          bgColor: "red",
          bg: "red",
          backgroundColor: "red",
        },
      },
    },
  }
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
}
