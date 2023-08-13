import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { PrimeReactContext, PrimeReactProvider } from 'primereact/api';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrimeReactProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </PrimeReactProvider>
  );
}
