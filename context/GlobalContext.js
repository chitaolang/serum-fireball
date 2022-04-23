import React, { useState, useEffect } from 'react'
import { getAccount } from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getTokenAccounts } from '../utils/web3';
import { getSolanaTokenList } from '../utils/web3';

export const GlobalContext = React.createContext(null)

export default function GlobalProvider({ children }) {
    const [tokenAccounts, setTokenAccounts] = useState([]);
    const [tokenList, setTokenList] = useState([]);

    const { connected, wallet, publicKey } = useWallet()
    const { connection } = useConnection()
    useEffect(() => {
        const fetchTokenList = async () => {
            const tokenList = await getSolanaTokenList()
            setTokenList(tokenList)
        }
        if (tokenList.length === 0) {
            fetchTokenList()
        }
    }, [tokenList.length]);
    useEffect(() => {
        const fetchTokenAccounts = async () => {
            const tokenAccounts = await getTokenAccounts(connection, publicKey)
            setTokenAccounts(tokenAccounts)
        }
        if (connected && publicKey) {
            fetchTokenAccounts()
        }
    }, [connected, connection, publicKey])

    return (
        <GlobalContext.Provider
            value={{
                setTokenAccounts,
                tokenAccounts,
                tokenList
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}