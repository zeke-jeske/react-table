'use client'
import Image from 'next/image'
import { styled, createGlobalStyle } from 'styled-components'
import Table from '../src/components/Table'
import { FC, SetStateAction, useState } from 'react'
import Row from '../src/components/Row'
import Cell from '../src/components/Cell'
import Head from 'next/head'
import RowToggleBtn from '../src/components/RowToggleBtn'
import ExpandedRow from '../src/components/ExpandedRow'

const GlobalStyle = createGlobalStyle`
  :root {
    --heading-bottom-margin: 1.5rem;
  }

  body {
    font-family: "Open Sans", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  * {
    font-family: inherit;
    margin: 0;
    padding: 0;
  }

  h1 {
    margin-bottom: var(--heading-bottom-margin);
    font-weight: 500;
    font-size: 1.75rem;
    line-height: 2rem;
  }

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas;
    font-size: 0.9em;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    line-height: 1.5;
    background: rgb(247, 250, 252);
    padding: 0.1rem 0.25rem;
    border-radius: 0.25rem;
    border: 1px solid rgb(229, 231, 235);
  }
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 4rem;
`

const After = styled.div`
  position: relative;
  margin-top: 1.5rem;
`

const Home: FC = () => {
  function generateData(): Row[] {
    const rows = [] as Row[]
    for (let i = 0; i < 10; i++) {
      const row = {
        cells: ['John Doe', 'Acme Inc.', '2023-02-01', 'Approved', 100],
        expanded: 'Hello!',
      }
      rows.push(row)
    }
    return rows
  }

  return (
    <Main>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <h1>React Advanced Table example</h1>
      <Table
        expandableRows
        columns={['Name', 'Company', 'Date', 'Status', 'Amount']}
        getColId={(_col, i, tableId) => `${tableId}-col-${i}`}
        id="table-1"
        rows={generateData()}
        minCellWidth={100}
      />
      <After>
        <h1>Testing content below the table</h1>
        <p>
          This content must have <code>position: relative</code> for{' '}
          <code>z-index</code> to work correctly if <code>overflowFix</code> is
          used.
        </p>
      </After>
    </Main>
  )
}

export default Home
