import Layout from '@/components/Layout';
import { AppProvider } from '@/providers/app-provider';
import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';


function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="marmearm, tutorial" />
        <meta name="author" content="Ferry L.H." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AppProvider>
        <Layout tags={pageProps.tags}>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  )
}

export default appWithTranslation(App)