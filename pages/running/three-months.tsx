import {Timestamp} from '@firebase/firestore';
import clsx from 'clsx';
import differenceInDays from 'date-fns/differenceInDays';
import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import styled from 'styled-components';

import {Card} from '../../components/atoms/Card';
import HealthBar from '../../components/atoms/HealthBar';
import {ThreeMonthChallengeData} from '../api/threeMonthChallenge';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 180px;
    gap: 14px;
    padding: 5px 10px 20px 10px;
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
`;

const CardContent = styled.div`
    position: static;
`;

const DayItem = styled(Card)`
    &.passed,
    &.passed::after,
    &.passed::before {
        background: rgb(10 175 17);
    }

    &.current,
    &.current::after,
    &.current::before {
        background: rgb(199, 156, 14);
    }

    &.failed,
    &.failed::after,
    &.failed::before {
        background: rgb(203, 0, 54);
    }
`;

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
                                key={idx}
                                borderWidth={4}
                                className={clsx({
                                    passed,
                                    failed,
                                    current,
                                })}
                                style={{userSelect: 'none'}}
                            >
                                <CardContent>
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
                                        '?'
                                    ) : (
                                        idx + 1
                                    )}
                                </CardContent>
                            </DayItem>
                        );
                    },
                )}
            </GridContainer>
        </main>
    );
};

export default ThreeMonth;
