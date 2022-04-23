import React, { useState, useEffect } from 'react'
import { PublicKey } from '@solana/web3.js';
import { Market } from '@project-serum/serum';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export const SerumContext = React.createContext(null)

export default function SerumProvider({ children }) {
  const { connection } = useConnection()
  const [market, setMarket] = useState(null)
  const marketAddress = new PublicKey('9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT');
  const programAddress = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin");
  useEffect(() => {
    const buildMarket = async () => {
      const market = await Market.load(connection, marketAddress, {}, programAddress)
      setMarket(market)
    }
    buildMarket()
  }, [connection])

  return (
    <SerumContext.Provider
      value={{
        market
      }}
    >
      {children}
    </SerumContext.Provider>
  )
}