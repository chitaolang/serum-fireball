import React, { useEffect } from "react"
import {
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react"
import Image from "next/image"
import { useSerum } from "../hooks"

import Card from "../components/Card"
import BuySell from "../components/BuySell"
import Martingale from "../components/Martingale"
import Fib from "../components/Fib"
import Tab from "../components/Tab"
import SOL from "../asset:img/sol.svg"
import USDC from "../asset:img/usdc.svg"

export default function Home() {
  const { serumOrders, refreshOrder } = useSerum()
  useEffect(() => {
    refreshOrder()
  }, [])
  console.log(serumOrders)

  return (
    <Flex align="center" justify="center" flexDir="column">
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
              <Tab
                _focus={{
                  boxShadow: 'none'
                }}
                _active={{
                  backgroun: 'transparent'
                }}
              >
                Fibonacci
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <BuySell />
              </TabPanel>
              <TabPanel>
                <Martingale />
              </TabPanel>
              <TabPanel>
                <Fib />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Card>
      <Flex w="25rem" p="2rem" flexDir="column">
        {serumOrders.map(order => {
          const {
            orderId,
            size,
            side,
            price
          } = order

          return (
            <Flex w="100%" key={orderId.toString()}>
              <Flex w="100%" flexDir="column" justify="center" align="center">
                <Text >Size</Text>
                <Text color="gray.1500">{size}</Text>
              </Flex>
              <Flex w="100%" flexDir="column" justify="center" align="center">
                <Text >Side</Text>
                <Text color="gray.1500">{side}</Text>
              </Flex>
              <Flex w="100%" flexDir="column" justify="center" align="center">
                <Text >Price</Text>
                <Text color="gray.1500">{price}</Text>
              </Flex>
            </Flex>
          )
        })}

      </Flex>
    </Flex >
  )
}
