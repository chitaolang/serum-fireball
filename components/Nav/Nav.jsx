import React from 'react'
import styles from './nav.module.css'
import { Heading, Flex, Button } from '@chakra-ui/react'

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
        <Button size="lg" variant="dark">Connect to Wallet</Button>
      </Flex>
    )
  }