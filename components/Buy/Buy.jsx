import React, { useState, useEffect } from "react";
import styles from "./Buy.module.css"
import { Flex, Text, Button } from "@chakra-ui/react"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from "../Input"
import Select from "../Select"
import Capacity from "../Capacity/Capacity"
import useGlobal from "../../hooks/useGlobal";

export default function Buy({ ...props }) {
  const { tokenAccounts } = useGlobal()
  const [usdcAmount, setUsdcAmount] = useState(0)
  const [capacity, setCapacity] = useState(0);
  const formik = useFormik({
    initialValues: {
      type: 'limit',
      price: 0,
      size: 0,
      quantity: 0,
    },
    validationSchema: Yup.object({

    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  })
  useEffect(() => {
    const usdcInfo = tokenAccounts.find(
      token => token.mint === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    )
    setUsdcAmount(usdcInfo ? usdcInfo.amount : 0)
  }, [tokenAccounts])

  useEffect(() => {
    formik.setFieldValue('quantity', capacity * usdcAmount)
  }, [capacity])
  useEffect(() => {
    const {
      values: {
        price,
        quantity
      }
    } = formik
    if (price && price != 0) {
      formik.setFieldValue('size', (quantity / price).toFixed(2))
    }
  }, [formik.values.price, formik.values.quantity])

  useEffect(() => {
    const {
      values: {
        price,
        size
      }
    } = formik
    if (price && price != 0) {
      formik.setFieldValue('quantity', (size * price).toFixed(2))
    }
  }, [formik.values.price, formik.values.size])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex align="center" flexDirection="column">
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
          <Capacity setCapacity={setCapacity} />
        </Flex>
        <Button mt="2rem" w="50%" size="sm" variant="bright" type="submit">SET ORDER</Button>
      </Flex>
    </form>
  )
}