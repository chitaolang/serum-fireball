import {
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react"
import Image from "next/image"
import Card from "../components/Card"
import Buy from "../components/Buy/Buy"
import Tab from "../components/Tab"
import SOL from "../asset:img/sol.svg"
import USDC from "../asset:img/usdc.svg"

export default function Home() {
  return (
    <Flex align="center" justify="center">
      <Card w="25rem" p="2rem">
        <Flex align="center" justify="center" flexDir="column">
          <Flex>
            <Flex marginRight="0.5rem">
              <Image
                src={SOL}
                alt="pair"
              />
              <Image
                src={USDC}
                alt="pair"
              />
            </Flex>
            <Text fontSize="xl">SOL/USDC</Text>
          </Flex>
          <Tabs colorScheme='primary' defaultIndex={0}>
            <TabList>
              <Tab
                _focus={{
                  boxShadow: 'none'
                }}
                _active={{
                  backgroun: 'transparent'
                }}
              >
                BUY
              </Tab>
              <Tab
                _focus={{
                  boxShadow: 'none'
                }}
                _active={{
                  backgroun: 'transparent'
                }}
              >
                SELL
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Buy />
              </TabPanel>
              <TabPanel>
                <p>SELL!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Card>
    </Flex >
  )
}
