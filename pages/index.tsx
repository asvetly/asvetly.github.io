import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <main className={ styles.content }>
      <Head>
        <title>asvetly</title>
        <meta name="description" content="Alexander Svetly" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={ styles.stickerContainer }>
        <div className={ styles.stickerHeader }>
          <h1>HELLO</h1>
          <span>MY NAME IS...</span>
        </div>
        <div className={ styles.stickerBody }>
          <span>asvetly</span>
        </div>
        <div className={ styles.stickerFooter }>
          <a href="https://t.me/asvetly" target="_blank" rel="noreferrer">telegram</a>
          <span>  •  </span>
          <a href="https://medium.com/@asvetly" target="_blank" rel="noreferrer">medium</a>
          <span>  •  </span>
          <a href="https://github.com/asvetly" target="_blank" rel="noreferrer">github</a>
          <span>  •  </span>
          <a href="/cv.pdf" target="_blank">cv</a>
        </div>
      </div>
    </main>
  )
}

export default Home;
