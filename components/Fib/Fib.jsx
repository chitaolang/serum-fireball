import React, { useState, useEffect } from "react"
import { getFibRetracement, levels } from 'fib-retracement'
import styles from "./Fib.module.css"
import { Flex, Text, Button } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Input from "../Input"
import Capacity from "../Capacity/Capacity"
import { useGlobal, useSerum } from "../../hooks"
import { PublicKey } from "@solana/web3.js"

export default function Fib({ ...props }) {
  const { tokenAccounts } = useGlobal()
  const { connection } = useConnection()
  const { publicKey, signAllTransactions } = useWallet()
  const { market } = useSerum()
  const [usdcAmount, setUsdcAmount] = useState(0)
  const [capacity, setCapacity] = useState(0)
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])

  const caculate = (
    Top,
    drop,
    times,
    first,
    quantity,
  ) => {
    console.log({
      Top,
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
      const transaction = (placeOrderTransaction.transaction)
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash
      transaction.feePayer = publicKey

      transactions.push(transaction)
    }
    const txid = await signAllTransactions(transactions)
    console.log(txid)
  }

  const formik = useFormik({
    initialValues: {
      top: 0,
      bottom: 0,
      fibs: {}
    },
    validationSchema: Yup.object({

    }),
    onSubmit: values => {
      const {
        top,
        bottom
      } = values
      console.log(values)
      console.log(publicKey)
      const fibs = getFibRetracement({ levels: { 0: top, 1: bottom } });

      /*
      const orders = caculate(start, drop, times, first, quantity)

      const payer = new PublicKey('7YqU1eWcVtq89AdeoifkMbZcKPVXUPZFT25Cejp4HJV1')
      const owner = publicKey
      setOrder(
        owner,
        payer,
        orders
      )
      */
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
      //formik.setFieldValue('quantity', (capacity * usdcAmount).toFixed(2))
    }
  }, [capacity])

  useEffect(() => {
    const {
      values: {
        top,
        bottom
      }
    } = formik

    if (bottom > top) {
      const fibs = getFibRetracement({ levels: { 0: top, 1: bottom } });
      const fibsInput = {}

      Object.keys(fibs).forEach(fib => {
        fibsInput[fibs[fib]] = {
          side: 'buy',
          size: 0
        }
      })
      formik.setFieldValue('fibs', fibsInput)

      console.log(fibsInput)
    }
  }, [formik.values.bottom, formik.values.top])


  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex align="center" flexDirection="column">
        <Flex className={styles.column}>
          <Flex className={styles.input} flexBasis="48%">
            <Text className={styles.label}>Top Price</Text>
            <Input
              size="md"
              id="top"
              name="top"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.top}
            />
          </Flex>
          <Flex className={styles.input} flexBasis="48%">
            <Text className={styles.label}>Bottom Price</Text>
            <Input
              size="md"
              id="bottom"
              name="bottom"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bottom}
            />
          </Flex>
          <Flex className={styles.input} flexBasis="48%">
            {
              Object.keys(formik.values.fibs).length > 0 ? (Object.keys(formik.values.fibs).map((fib, index) => {
                return (
                  <Flex key={fib + 'size'}>
                    <Input size="md"
                      id={fib + 'size'}
                      name={fib + 'size'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fibs[fib].size} />
                  </Flex>
                )
              }))
                :
                null
            }
          </Flex>
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