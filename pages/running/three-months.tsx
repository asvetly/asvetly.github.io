import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import styled, { css } from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(18, 60px);
  gap: 8px;
  padding: 10px;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(10, 100px);
  }
`

const undiscovered = css`
  cursor: pointer;
  transition: transform 250ms cubic-bezier(0.7, 0.2, 0.54, 0.63);
  &:hover {
    transform: scale(1.1, 1.1);
  }
`

const CardContainer = styled.div`
  border: 1px solid salmon;
  border-radius: 5px;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;

  ${ () => undiscovered }
`

const ThreeMonth: NextPage = () => {
    return (
        <main style={{ height: '100%' }}>
            <Head>
                <title>asvetly</title>
                <meta name="description" content="Alexander Svetly" />
                <meta charSet="UTF-8" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GridContainer>
                {
                    Array.from(new Array(90)).map((_, idx) => (
                        <CardContainer key={ idx }>{ idx + 1 }</CardContainer>
                    ))
                }
            </GridContainer>
        </main>
    )
}

export default ThreeMonth;
