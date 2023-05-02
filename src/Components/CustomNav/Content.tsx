"use client";

import { Box } from "./Box";

export const Content = ({ children }: any) => (
  <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>{children}</Box>
);
