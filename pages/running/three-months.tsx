import {Timestamp} from '@firebase/firestore';
import clsx from 'clsx';
import differenceInDays from 'date-fns/differenceInDays';
import type {NextPage} from 'next';
import Head from 'next/head';
import {useEffect, useState} from 'react';
import styled from 'styled-components';

import {Card} from '../../components/atoms/Card';
import HealthBar from '../../components/atoms/HealthBar';
import {ThreeMonthChallengeData} from '../api/threeMonthChallenge';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 180px;
    gap: 20px;
    padding: 5px 15px 20px 15px;
    justify-content: center;

    @media only screen and (min-width: 768px) {
        grid-template-columns: repeat(5, 1fr);
        grid-auto-rows: 200px;
    }

    @media only screen and (min-width: 1024px) {
        grid-template-columns: repeat(5, 1fr);
        grid-auto-rows: 250px;
    }
`;

const NavBar = styled.div`
    position: sticky;
    display: flex;
    align-items: center;
    top: 0;
    padding: 10px;
    z-index: 2;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(2px);
    font-size: 1.1rem;
`;

const DayItem = styled(Card)`
    font-size: 2.2rem;

    &.passed,
    &.passed::after,
    &.passed::before {
        background: linear-gradient(
            10deg,
            hsl(125, 68%, 44%),
            hsl(115, 68%, 44%),
            hsl(120, 68%, 44%),
            hsl(130, 68%, 44%)
        );
        animation: spin 4s linear infinite;
        background-size: 400% 400%;
    }

    &.current,
    &.current::after,
    &.current::before {
        background: linear-gradient(
            10deg,
            hsl(46, 100%, 50%),
            hsl(40, 100%, 50%),
            hsl(43, 100%, 50%),
            hsl(48, 100%, 50%)
        );
        animation: spin 4s linear infinite;
        background-size: 400% 400%;
    }

    &.failed,
    &.failed::after,
    &.failed::before {
        background: linear-gradient(
            10deg,
            hsl(0, 100%, 50%),
            hsl(0, 100%, 45%),
            hsl(0, 100%, 48%),
            hsl(0, 100%, 53%)
        );
        animation: spin 4s linear infinite;
        background-size: 400% 400%;
    }
`;

// const Button = styled``

const ThreeMonth: NextPage = () => {
    const [data, setData] = useState<ThreeMonthChallengeData | undefined>(
        undefined,
    );
    const [currentDay, setCurrentDay] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const threeMonthChallenge = await fetch(
                '/api/threeMonthChallenge',
            ).then((d) => d.json());
            setData(threeMonthChallenge);
            setCurrentDay(
                differenceInDays(
                    new Date(),
                    new Timestamp(
                        threeMonthChallenge.challenge.startDate.seconds,
                        threeMonthChallenge.challenge.startDate.nanoseconds,
                    ).toDate(),
                ),
            );
        })();
    }, []);

    return (
        <main
            style={{
                height: 'fit-content',
                fontFamily: "'VT323', monospace",
            }}
        >
            <Head>
                <title>You can do anything you want</title>
                <meta name="description" content="Alexander Svetly" />
                <link
                    href="https://fonts.googleapis.com/css2?family=VT323&display=optional"
                    rel="stylesheet"
                />
            </Head>
            <NavBar>
                <span>
                    days passed:{' '}
                    <b>
                        {currentDay - (data?.challenge.daysFailed.length ?? 0)}
                    </b>
                </span>
                <HealthBar style={{marginLeft: 'auto'}} />
            </NavBar>
            <GridContainer>
                {Array.from({length: data?.challenge.days || 0}).map(
                    (c, idx) => {
                        const failed = data?.challenge.daysFailed.includes(idx);
                        const passed = idx < currentDay && !failed;
                        const current = idx === currentDay;
                        const gift = data?.gifts.find((g) => g.winDay === idx);
                        return (
                            <DayItem
                                width="114px"
                                key={idx}
                                borderWidth={4}
                                className={clsx({
                                    passed,
                                    failed,
                                    current,
                                })}
                                style={{userSelect: 'none'}}
                            >
                                {passed ? (
                                    gift ? (
                                        <a
                                            href={gift.link}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <img
                                                src={gift.image}
                                                style={{
                                                    width: '70%',
                                                    margin: 'auto',
                                                    animation:
                                                        'waving 1.5s linear infinite',
                                                }}
                                            />
                                        </a>
                                    ) : (
                                        '🎉'
                                    )
                                ) : failed ? (
                                    '☠️'
                                ) : current ? (
                                    <div>
                                        <p
                                            style={{
                                                fontSize: '3rem',
                                                lineHeight: '2.6rem',
                                                letterSpacing: '-0.2rem',
                                            }}
                                        >
                                            DID
                                        </p>
                                        <p
                                            style={{
                                                fontSize: '2rem',
                                                letterSpacing: '-0.1rem',
                                                lineHeight: '1.5rem',
                                            }}
                                        >
                                            you?
                                        </p>
                                        <div style={{fontSize: '2rem'}}>
                                            <button>🎉</button>
                                            <button>☠️</button>
                                        </div>
                                    </div>
                                ) : (
                                    idx + 1
                                )}
                            </DayItem>
                        );
                    },
                )}
            </GridContainer>
        </main>
    );
};

export default ThreeMonth;
