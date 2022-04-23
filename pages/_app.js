import '../styles/globals.css'
import 'normalize.css/normalize.css';
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import Layout from '../components/Layout'
import ContextCompose from '../components/ContextCompose';
import WalletContext from '../context/WalletConext';
import { GlobalProvider } from '../context/GlobalContext';


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <WalletContext>
        <ContextCompose
          contexts={[
            GlobalProvider,
          ]}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContextCompose>
      </WalletContext>

    </ChakraProvider>
  )
}

export default MyApp
