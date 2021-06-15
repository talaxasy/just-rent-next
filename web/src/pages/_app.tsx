import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import theme from '../theme';
import 'react-dates/lib/css/_datepicker.css';
import '../styles/main.scss';



function MyApp({ Component, pageProps }: AppProps) {
  return (

    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>

  )
}

export default MyApp
