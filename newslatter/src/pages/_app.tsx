import { AppProps } from 'next/app'
import { Header } from '../compoments/Header';
import { SessionProvider  as NextAuthProvider } from 'next-auth/react';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header></Header>
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
