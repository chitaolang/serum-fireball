import React, { useState, useEffect } from "react";
import styles from "./Buy.module.css"
import { Flex, Text, Button } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from "../Input"
import Select from "../Select"
import Capacity from "../Capacity/Capacity"
import { useGlobal, useSerum } from "../../hooks";
import { PublicKey } from "@solana/web3.js";

export default function BuySell({ ...props }) {
  const { tokenAccounts } = useGlobal()
  const { connection } = useConnection()
  const { publicKey, signTransaction } = useWallet()
  const { market } = useSerum()
  const [usdcAmount, setUsdcAmount] = useState(0)
  const [capacity, setCapacity] = useState(0)
  const [loading, setLoading] = useState(false)

  const setOrder = async (owner, payer, side, price, size) => {
    setLoading(true)
    const placeOrderTransaction = await market.makePlaceOrderTransaction(connection, {
      owner,
      payer,
      side,
      price,
      size,
      orderType: 'limit',
      feeDiscountPubkey: null, // needed to enable devnet/localnet
    });

    const transaction = (placeOrderTransaction.transaction)
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash
    transaction.feePayer = publicKey
    const txid = await signTransaction(transaction)
    console.log(txid)
  }

  const formik = useFormik({
    initialValues: {
      type: 'buy',
      price: 0,
      size: 0,
      quantity: 0,
    },
    validationSchema: Yup.object({

    }),
    onSubmit: values => {
      const {
        type,
        price,
        size,
      } = values
      console.log(values)
      console.log(publicKey)

      const payer = new PublicKey('7YqU1eWcVtq89AdeoifkMbZcKPVXUPZFT25Cejp4HJV1')
      const owner = publicKey
      setOrder(
        owner,
        payer,
        type,
        price,
        size
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
    const {
      values: {
        size,
        price,
        quantity
      }
    } = formik

    let data = {
      type: 'buy',
      quantity,
      price: (quantity / size).toFixed(2),
      size,
    }

    if (price > 0 && size > 0 && quantity > 0) {
      formik.setValues(data)
    } else {
      formik.setValues({
        type: 'buy',
        price,
        size,
        quantity
      })
    }
  }, [formik.values.quantity])

  useEffect(() => {
    const {
      values: {
        size,
        price,
        quantity
      }
    } = formik

    let data = {
      type: 'buy',
      price,
      size,
      quantity: (price * size).toFixed(2),
    }

    if (price > 0 && size > 0 && quantity > 0) {
      formik.setValues(data)
    } else {
      formik.setValues({
        type: 'buy',
        price,
        size,
        quantity
      })
    }
  }, [formik.values.price])

  useEffect(() => {
    const {
      values: {
        price,
        size,
        quantity
      }
    } = formik

    let data = {
      type: 'buy',
      price: price,
      size: size,
      quantity: (price * size).toFixed(2),
    }

    if (price > 0 && size > 0 && quantity > 0) {
      formik.setValues(data)
    } else {
      formik.setValues({
        type: 'buy',
        price,
        size,
        quantity
      })
    }
  }, [formik.values.size])


  useEffect(() => {
    const {
      values: {
        size,
        price,
        quantity
      }
    } = formik
    if (price > 0 && size > 0) {
      formik.setValues({
        type: 'buy',
        price,
        size: (capacity * usdcAmount / price).toFixed(2),
        quantity: (capacity * usdcAmount).toFixed(2)
      })
    }
  }, [capacity])


  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex align="center" flexDirection="column">
        <Flex className={styles.column}>
          <Flex className={styles.input} flexBasis="48%">
            <Text className={styles.label}>Type</Text>
            <Select
              id="type"
              name="type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
            >
              <option value='buy'>Buy</option>
              <option value='sell'>Sell</option>
            </Select>
          </Flex>
          <Flex className={styles.input} flexBasis="48%">
            <Text className={styles.label}>Price</Text>
            <Input
              size="md"
              id="price"
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
          </Flex>
        </Flex>
        <Flex className={styles.column}>
          <Flex className={styles.input} flexBasis="48%">
            <Text className={styles.label}>Size</Text>
            <Input
              size="md"
              id="size"
              name="size"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.size}
            />
          </Flex>
          <Flex className={styles.input} flexBasis="48%">
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
        </Flex>
        <Flex w="100%" flexDir="column">
          <Text className={styles.label} mt="0.4rem" mb="0">USDC Amount: {usdcAmount}</Text>
          <Capacity parent="buysell" setCapacity={setCapacity} />
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