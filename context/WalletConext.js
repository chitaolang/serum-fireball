import React, { useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets'

export default function WalletContext({ children }) {
    const network = 'https://solana-api.projectserum.com';
    const endpoint = useMemo(() => network, [network]);
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        []
    );
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    )
}