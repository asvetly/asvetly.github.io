import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import {PropsWithChildren} from "react";

export default function Layout({ children, home }: PropsWithChildren<{ home?: boolean; }>) {
    return (
        <div className={styles.container}>
            <Head>
                <meta name="description" content="Alexander Svetly" />
                <meta charSet="UTF-8" />
                <meta charSet="utf-8"/>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/logo192.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="theme-color" content="#000000"/>
                <link rel="manifest" href="/manifest.json"/>
            </Head>
            <header className={styles.header}>
                {
                    home && (
                        <>
                            <Image
                                priority
                                src="/images/profile.png"
                                className={utilStyles.borderCircle}
                                height={144}
                                width={144}
                                alt="asvetly"
                            />
                            <h1 className={utilStyles.heading2Xl}>asvetly</h1>
                        </>
                    )
                }
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    )
}
