import React from 'react'
import styles from './nav.module.css'
import { Heading, Flex } from '@chakra-ui/react'
import { useConnection } from '@solana/wallet-adapter-react';
import Connect from '../Connect';

export default function Nav({ children, ...props }) {
    return (
        <Flex
        as='nav'
        align='center'
        justify='space-between'
        wrap='wrap'
        w='100%'
        p="1rem 3.8rem"
        bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
        color={['white', 'white', 'primary.700', 'primary.700']}
        {...props}
      >
        <Heading className={styles.logo}>HACKTHON</Heading>
        <Connect />
      </Flex>
    )
  }