import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@components/layout'
import { SWRConfig } from 'swr'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}

export default MyApp
