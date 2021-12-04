import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'

const ThreeMonth: NextPage = () => {
  return (
    <main className={ styles.content }>
      <Head>
        <title>asvetly</title>
        <meta name="description" content="Alexander Svetly" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </main>
  )
}

export default ThreeMonth;
