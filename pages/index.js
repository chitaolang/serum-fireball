import React from "react"
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
import BuySell from "../components/BuySell"
import Martingale from "../components/Martingale"
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
                BUY/SELL
              </Tab>
              <Tab
                _focus={{
                  boxShadow: 'none'
                }}
                _active={{
                  backgroun: 'transparent'
                }}
              >
                Martingale
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <BuySell />
              </TabPanel>
              <TabPanel>
                <Martingale />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Card>
    </Flex >
  )
}
