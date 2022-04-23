import React from "react"
import { Tab as ChakraTab } from "@chakra-ui/react"

export default function Tab({ children, ...props }) {
  return (
    <ChakraTab
      _focus={{
        boxShadow: 'none'
      }}
      _active={{
        backgroun: 'transparent'
      }}
      {...props}
    >
      {children}
    </ChakraTab>
  )
}