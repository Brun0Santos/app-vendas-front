import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { PrimeReactProvider } from 'primereact/api';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrimeReactProvider>
      <ChakraProvider>
        <Component {...pageProps} />
        <Toaster />
      </ChakraProvider>
    </PrimeReactProvider>
  );
}
