import type { NextPage } from 'next'
import { doc, getDoc } from 'firebase/firestore/lite';

import Head from "next/head";
import {useCallback, useEffect, useRef, useState} from "react";
import LightStrip from "../../components/atoms/LightStrip";
import useCanvasSnowfall from "../../hooks/useCanvasSnowfall";
import {firebaseDb} from "../../firebase";
import useCanvasFireworks from "../../hooks/useCanvasFireworks";
import { TweenMax, Power2 } from 'gsap';
import GiftBox from "../../components/atoms/GiftBox";
import styled from "styled-components";
import {Card} from "../../components/atoms/Card";

const GiftContainer = styled.div`
  &.hidden {
    display: none;
  }
  transform: scale(0);
  transform-origin: center center;
  animation: scaling 1.5s ease-in;
  animation-delay: 2s;
  animation-fill-mode: forwards;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;

  @keyframes scaling {
    from{ transform: scale(0); }
    to{ transform: scale(1); }
  }
`

const CardContainer = styled.div`
  transform: scale(0);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`

const NewYearGift: NextPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [message, setMessage] = useState<{ title: string; message: string; link: string; } | undefined>(undefined);

    useCanvasSnowfall(canvasRef);
    useCanvasFireworks(canvasRef);

    useEffect(() => {
        const id = new URLSearchParams(location.search).get('c');
        if (!id) return;
        getDoc(doc(firebaseDb, 'new-year-gifts', id))
            .then(r => {
                setMessage(r.data() as any);
            });
    }, []);

    const openGift = useCallback(() => {
        document.querySelector(".gift")?.removeEventListener("click", openGift);
        TweenMax.set(".hat", {
            transformOrigin: "left bottom"
        });
        TweenMax.to(".hat", 1, {
            rotationZ: -80,
            x: -500,
            opacity:0,
            ease: Power2.easeIn
        });
        TweenMax.to(".box", 1, {
            y: 800,
            ease: Power2.easeIn
        });
        TweenMax.to(".gift", 1, {
            opacity: 0,
            delay: 1,
            onStart: function() {
                TweenMax.to(".card", 1, {
                    scale: 1,
                    delay: 0,
                    duration: 1,
                    ease: Power2.easeOut
                });
                // document.querySelector(".card")?.classList.add("show");
            },
            onComplete: function() {
                document.querySelector(".gift")?.classList.add("hidden");
            }
        });
    }, []);

    return (
        <main style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                <title>{ message?.title }</title>
            </Head>
            <canvas ref={ canvasRef } style={{
                backgroundImage: 'linear-gradient(0deg, #004e92 0%, #000428 80%)',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: -2,
            }}/>

            <LightStrip />

            <GiftContainer className="gift" onClick={ () => openGift() }>
                <GiftBox />
            </GiftContainer>

            <CardContainer className="card">
                <Card
                    height="50vh"
                    width="0"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '20px 10px',
                        fontSize: '1rem',
                    }}
                >
                    <h4
                        style={{
                            fontSize: '1.2rem'
                        }}
                    >
                        { message?.title }
                    </h4>
                    <p style={{ fontSize: '1rem' }}>{ message?.message }</p>
                    <div style={{
                        position: 'relative',
                        fontSize: '1.2rem',
                        background: '#d3d3d326',
                        borderRadius: '8px',
                        padding: '5px',
                        borderTopLeftRadius: 0,
                    }}>
                        <span
                            style={{
                                fontSize: '0.55rem',
                                position: 'absolute',
                                top: '-14px',
                                left: '0px',
                            }}
                        >
                            Код для доступа к тесту
                        </span>
                        <b>{ message?.link }</b>
                    </div>
                </Card>
            </CardContainer>

            {/*<SnowHouses />*/}
        </main>
    )
}

export default NewYearGift;
