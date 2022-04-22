import '../styles/globals.css'
import 'normalize.css/normalize.css';
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import Layout from '../components/Layout'
import WalletContext from '../context/WalletConext';


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <WalletContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletContext>
    </ChakraProvider>
  )
}

export default MyApp
