import '@/app/styles/globals.scss'
import type { AppProps } from 'next/app'
import NavBar from '@/widgets/navbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <div id='modal' />
    </>
  )
}
