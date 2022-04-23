import React from "react"
import { Text, HStack, Box, useRadio, useRadioGroup } from "@chakra-ui/react"

function Radio(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'

        _checked={{
          bg: 'gray.2000',
          color: 'primary.600',
        }}
        _focus={{
          boxShadow: 'none',
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default function Capacity({ ...props }) {
  const options = ['0.1', '0.25', '0.50', '0.75', '1']
  const { setCapacity, parent } = props

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'capacity',
    onChange: value => setCapacity(value),
  })

  const group = getRootProps()

  return (
    <HStack m="0.4rem 0" p="0 0.4rem" justify="space-around" background="gray.2300" borderRadius="1rem" {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <Radio id={parent + value} key={value} {...radio}>
            <Text p="0.4rem 0.5rem" fontSize="0.8rem">{value * 100}%</Text>
          </Radio>
        )
      })}
    </HStack>
  )
}