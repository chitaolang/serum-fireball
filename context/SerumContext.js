import React, { useState, useEffect } from 'react'
import { PublicKey } from '@solana/web3.js';
import { Market, MARKETS } from '@project-serum/serum';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export const SerumContext = React.createContext(null)

export default function SerumProvider({ children }) {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [market, setMarket] = useState(null)
  const [serumOrders, setSerumOrders] = useState([])
  const marketAddress = new PublicKey('9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT');
  const programAddress = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin");

  const refreshOrder = async () => {
    if (publicKey) {
      const orders = await market.loadOrdersForOwner(connection, publicKey)
      setSerumOrders(orders)
    }
  }

  useEffect(() => {
    const buildMarket = async () => {
      const market = await Market.load(connection, marketAddress, {}, programAddress)
      setMarket(market)
    }
    const getOrders = async () => {
      if (publicKey) {
        const orders = await market.loadOrdersForOwner(connection, publicKey)
        setSerumOrders(orders)
      }
    }
    buildMarket()
    getOrders()
  }, [connection])

  return (
    <SerumContext.Provider
      value={{
        market,
        serumOrders,
        refreshOrder
      }}
    >
      {children}
    </SerumContext.Provider>
  )
}