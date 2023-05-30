// see https://medium.com/@justicart/overflow-x-scroll-overflow-y-visible-c1a98238e002

import React, { forwardRef } from 'react'
import styled from 'styled-components'
import noScrollbar from '../lib/noScrollbar'

// TYPES

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  numRows: number
  overflowFix: boolean
}

// CONSTANTS

const ROW_HEIGHT = '3rem'

// STYLED COMPONENTS

const Placeholder = styled.div<{ numRows: number; tableHeight: string }>`
  height: ${({ tableHeight }) => tableHeight};
  box-sizing: border-box;
  position: relative;
`

const OverflowContainer = styled.div<{ tableHeight: string }>`
  height: calc(${({ tableHeight }) => tableHeight} + 200px);
  box-sizing: border-box;
  overflow-x: auto;
  position: absolute;
  top: 0;
  width: 100%;

  ${noScrollbar}
`

const El = styled.table<{
  numRows: number
  tableHeight: string
  rowHeight: string
  overflowFix?: true
}>`
  height: ${({ tableHeight }) => tableHeight};
  box-sizing: border-box;
  min-width: 100%;
  font-size: 0.8rem;
  display: grid;
  grid-template-rows: repeat(
    ${({ numRows }) => numRows},
    ${({ rowHeight }) => rowHeight}
  );

  overflow-x: auto;
  ${noScrollbar}

  ${({ overflowFix }) =>
    overflowFix &&
    `
      position: absolute;
      top: 0;
      overflow: visible;
    `}
`

// COMPONENT

const TableEl = forwardRef<HTMLTableElement | null, Props>(
  ({ children, numRows, onScroll, overflowFix, ...props }, ref) => {
    const tableHeight = `calc(${ROW_HEIGHT} * ${numRows})`

    if (overflowFix) {
      return (
        <Placeholder numRows={numRows} tableHeight={tableHeight}>
          <OverflowContainer
            onScroll={onScroll}
            ref={ref}
            tableHeight={tableHeight}
          >
            <El
              numRows={numRows}
              tableHeight={tableHeight}
              rowHeight={ROW_HEIGHT}
              overflowFix={true}
              {...props}
            >
              {children}
            </El>
          </OverflowContainer>
        </Placeholder>
      )
    }

    return (
      <El
        numRows={numRows}
        tableHeight={tableHeight}
        rowHeight={ROW_HEIGHT}
        ref={ref}
        onScroll={onScroll}
        {...props}
      >
        {children}
      </El>
    )
  }
)

TableEl.displayName = 'TableEl'

export default TableEl
