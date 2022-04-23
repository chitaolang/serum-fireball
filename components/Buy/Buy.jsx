import React, { useState, useEffect } from "react";
import styles from "./Buy.module.css"
import { Flex, Text } from "@chakra-ui/react"
import Input from "../Input"
import Select from "../Select"
import Capacity from "../Capacity/Capacity"
import useGlobal from "../../hooks/useGlobal";

export default function Buy({ ...props }) {
  const { tokenAccounts } = useGlobal()
  const [usdcAmount, setUsdcAmount] = useState(0)
  useEffect(() => {
    const usdcInfo = tokenAccounts.find(
      token => token.mint === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    )
    setUsdcAmount(usdcInfo ? usdcInfo.amount : 0)
  }, [tokenAccounts])
  return (
    <Flex flexDirection="column">
      <Flex className={styles.column}>
        <Flex className={styles.input} flexBasis="48%">
          <Text className={styles.label}>Type</Text>
          <Select>
            <option value='limit'>Limit</option>
            <option value='market'>Market</option>
          </Select>
        </Flex>
        <Flex className={styles.input} flexBasis="48%">
          <Text className={styles.label}>Price</Text>
          <Input size="md" />
        </Flex>
      </Flex>
      <Flex className={styles.column}>
        <Flex className={styles.input} flexBasis="48%">
          <Text className={styles.label}>Size</Text>
          <Input size="md" />
        </Flex>
        <Flex className={styles.input} flexBasis="48%">
          <Text className={styles.label}>Quantity</Text>
          <Input size="md" />
        </Flex>
      </Flex>
      <Flex flexDir="column">
        <Text className={styles.label} mt="0.4rem" mb="0">USDC Amount: {usdcAmount}</Text>
        <Capacity />
      </Flex>
    </Flex>
  )
}