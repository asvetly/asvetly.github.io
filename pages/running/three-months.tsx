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

const ThreeMonth: NextPage = () => {
    const [data, setData] = useState<ThreeMonthChallengeData | undefined>(
        undefined,
    );

    useEffect(() => {
        (async () =>
            setData(
                await fetch('/api/threeMonthChallenge').then((d) => d.json()),
            ))();
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
                    days passed: <b>0</b>
                </span>
                <HealthBar style={{marginLeft: 'auto'}} />
            </NavBar>
            <GridContainer>
                {Array.from({length: data?.challenge.days || 0}).map(
                    (_, idx) => (
                        <Card key={idx} borderWidth={4}>
                            {idx + 1}
                        </Card>
                    ),
                )}
            </GridContainer>
        </main>
    );
};

export default ThreeMonth;
