import React from "react";
import { Select as ChakraSelect } from "@chakra-ui/react";

export default function Select({ children, ...props }) {
  return (
    <ChakraSelect
      border="solid 1px"
      borderColor="gray.2300"
      _hover={{
        border: 'solid 1px white',
        color: 'white'
      }}
      _focus={{
        border: 'solid 1px white',
        color: 'white'
      }}
      {...props}
    >
      {children}
    </ChakraSelect>
  )
}