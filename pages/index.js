import { Flex, Stack } from "@chakra-ui/react"
import Select from "../components/Select"

export default function Home() {
  return (
    <Flex>
      <Stack spacing={3}>
        <Select placeholder='small size' size='sm' >
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        <Select placeholder='medium size' size='md'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
      </Stack>
    </Flex>
  )
}
