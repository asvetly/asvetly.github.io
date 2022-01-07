import type { NextPage } from 'next'
import Head from 'next/head'
import styled, { css } from "styled-components";
import { Card } from '../../components/atoms/Card';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(30, 180px);
  gap: 14px;
  padding: 10px;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(10, 100px);
  }
`

const ThreeMonth: NextPage = () => {
    return (
        <main style={{ height: '100%' }}>
            <Head>
                <title>You can do anything you want</title>
                <meta name="description" content="Alexander Svetly" />
            </Head>
            <GridContainer>
                {
                    Array.from(new Array(90)).map((_, idx) => (
                        <Card key={ idx } borderWidth={ 4 }>{ idx + 1 }</Card>
                    ))
                }
            </GridContainer>
        </main>
    )
}

export default ThreeMonth;
