import { Content } from "./Content";
import { Box } from "./Box";

export const Layout = ({ children }: any) => (
  <Box
    css={{
      maxW: "100%",
    }}
  >
    {children}
    <Content />
  </Box>
);
