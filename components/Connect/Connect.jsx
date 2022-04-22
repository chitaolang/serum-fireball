import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Button } from '@chakra-ui/react'
import { useWallet } from '@solana/wallet-adapter-react'
import { abbreviate } from '../../utils';

export default function Connect() {
    const { wallet, connected, connect, connecting, disconnect, select, publicKey } = useWallet();
    const [address, setAddress] = useState(null)

    const handleClick = useCallback(
        (event) => {
            select('Phantom')
            if (!event.defaultPrevented && !connected) connect().catch(() => { })
        },
        [connect, connected, select]
    );

    const content = useMemo(() => {
        if (connecting) return 'Connecting ...'
        if (connected && publicKey) {
            const address = publicKey.toString()
            return abbreviate(address)
        }
        if (wallet) return 'Connect'
        return 'Connect Wallet'
    }, [connecting, connected, wallet, publicKey])

    return (
        <>
            <Button
                onClick={handleClick}
                size="lg"
                variant="dark"
            >
                {content}
            </Button>

        </>
    )
}