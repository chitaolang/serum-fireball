import React, { useState, useEffect } from "react";
import styles from "./Martingale.module.css"
import { Flex, Text, Button } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from "../Input"
import Capacity from "../Capacity/Capacity"
import { useGlobal, useSerum } from "../../hooks";
import { PublicKey } from "@solana/web3.js";
import { signAndSendTransactions } from "../../utils/web3";

export default function Martingale({ ...props }) {
  const { tokenAccounts } = useGlobal()
  const { connection } = useConnection()
  const { publicKey, signAllTransactions, wallet } = useWallet()
  const { market, refreshOrder } = useSerum()
  const [usdcAmount, setUsdcAmount] = useState(0)
  const [capacity, setCapacity] = useState(0)
  const [loading, setLoading] = useState(false)

  const caculate = (
    start,
    drop,
    times,
    first,
    quantity,
  ) => {
    console.log({
      start,
      drop,
      times,
      first,
      quantity,
    })
    let total = quantity
    let amount = first
    let i = 1
    const orders = [];
    while (total > 0) {
      const price = (start * ((1 - drop) ** i)).toFixed(2)
      amount = (amount * times).toFixed(2)
      const size = (amount / price).toFixed(2)
      total = total - amount
      i += i
      if (total > 0) {
        orders.push({
          price,
          size: Number(size),
          amount
        })
      }
    }
    return orders
  }

  const setOrder = async (owner, payer, orders) => {
    setLoading(true)
    const transactions = []
    console.log(orders)
    for (let order of orders) {
      const {
        price,
        size
      } = order
      const placeOrderTransaction = await market.makePlaceOrderTransaction(connection, {
        owner,
        payer,
        side: 'buy',
        price,
        size,
        orderType: 'limit',
        feeDiscountPubkey: null, // needed to enable devnet/localnet
      });
      console.log('Test')
      transactions.push(placeOrderTransaction)
    }
    const txid = await signAndSendTransactions({
      connection,
      wallet: wallet.adapter,
      feepayer: wallet.adapter,
      transactions
    })
    console.log(txid)
    refreshOrder()
    setLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      start: 0,
      drop: 0,
      times: 0,
      first: 0,
      quantity: 0,
    },
    validationSchema: Yup.object({

    }),
    onSubmit: values => {
      const {
        start,
        drop,
        times,
        first,
        quantity,
      } = values
      console.log(values)
      console.log(publicKey)

      const orders = caculate(start, drop, times, first, quantity)

      const payer = new PublicKey('7YqU1eWcVtq89AdeoifkMbZcKPVXUPZFT25Cejp4HJV1')
      const owner = publicKey
      setOrder(
        owner,
        payer,
        orders
      )
    },
  })

  useEffect(() => {
    const usdcInfo = tokenAccounts.find(
      token => token.mint === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    )
    setUsdcAmount(usdcInfo ? usdcInfo.amount : 0)
  }, [tokenAccounts])


  useEffect(() => {
    if (capacity) {
      formik.setFieldValue('quantity', (capacity * usdcAmount).toFixed(2))
    }
  }, [capacity])


  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex align="center" flexDirection="column">
        <Flex className={styles.column}>
          <Flex className={styles.input} flexBasis="48%">
            <Text className={styles.label}>Start Price</Text>
            <Input
              size="md"
              id="start"
              name="start"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.start}
            />
          </Flex>
          <Flex className={styles.input} flexBasis="48%">
            <Text className={styles.label}>Drop</Text>
            <Input
              size="md"
              id="drop"
              name="drop"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.drop}
            />
          </Flex>
        </Flex>
        <Flex className={styles.column}>
          <Flex className={styles.input} flexBasis="48%">
            <Text className={styles.label}>Times</Text>
            <Input
              size="md"
              id="times"
              name="times"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.times}
            />
          </Flex>
          <Flex className={styles.input} flexBasis="48%">
            <Text className={styles.label}>First Order Amount</Text>
            <Input
              size="md"
              id="first"
              name="first"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first}
            />
          </Flex>
        </Flex>
        <Flex className={styles.input} w="100%">
          <Text className={styles.label}>Quantity</Text>
          <Input
            size="md"
            id="quantity"
            name="quantity"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
          />
        </Flex>
        <Flex w="100%" flexDir="column">
          <Text className={styles.label} mt="0.4rem" mb="0">USDC Amount: {usdcAmount}</Text>
          <Capacity parent="martingale" setCapacity={setCapacity} />
        </Flex>
        <Button
          disabled={!publicKey && !market}
          isLoading={loading}
          mt="2rem"
          w="50%"
          size="sm"
          variant="bright"
          type="submit"
        >
          SET ORDER
        </Button>
      </Flex>
    </form >
  )
}