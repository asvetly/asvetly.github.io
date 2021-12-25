import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from "../components/layout";

const Home: NextPage = () => {
    return (
        <Layout home>
            <main className={ styles.content }>
                <Head>
                    <title>asvetly</title>
                </Head>

                <div style={{ display: 'block' }}>
                    <Link href="/running/three-months">90 days</Link>
                </div>


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
                        <span>  •  </span>
                        <a href="https://codepen.io/asvetly" target="_blank" rel="noreferrer">codepen</a>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default Home;
