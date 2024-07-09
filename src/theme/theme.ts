import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.800",
      },
    },
  },
  colors: {
    blue: {
      800: "#2b6cb0",
    },
    white: "#ffffff",
  },
  components: {
    Box: {
      variants: {
        sidebar: (props: StyleFunctionProps) => ({
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          width: "250px",
          backgroundColor: mode("blue.800", "blue.800")(props),
          color: mode("white", "white")(props),
          padding: "16px",
          boxShadow: "lg",
        }),
      },
    },
    Flex: {
      variants: {
        avatarHeading: {
          display: "flex",
          alignItems: "center",
          marginBottom: "32px",
        },
      },
    },
    Link: {
      variants: {
        sidebar: {
          display: "flex",
          alignItems: "center",
          marginRight: "8px",
        },
      },
    },
    IconButton: {
      variants: {
        logoutButton: {
          marginTop: "32px",
        },
      },
    },
  },
});

export default theme;
