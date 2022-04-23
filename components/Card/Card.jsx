import React from "react";
import { Box } from "@chakra-ui/react";

export default function Select({ children, ...props }) {
  return (
    <Box
      background="gray.2200"
      borderRadius="1rem"
      {...props}
    >
      {children}
    </Box>
  )
}