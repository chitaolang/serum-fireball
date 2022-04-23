import React from "react";
import { Input as ChakraInput } from "@chakra-ui/react";

export default function Select({ children, ...props }) {
  return (
    <ChakraInput
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
    </ChakraInput>
  )
}