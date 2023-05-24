import { useState, useRef, useEffect, FC, MouseEvent, ReactNode } from 'react'
import { useResizableTable } from '../lib/useResizableTable'
import { styled } from 'styled-components'
import Cell from './Cell'
import TableEl from './TableEl'
import RowContainer from './Row'
import { isValidElement } from 'react'
import ExpandedRow from './ExpandedRow'
import RowToggleBtn from './RowToggleBtn'

export const Wrapper = styled.div`
  /* TODO fix hydration errors */
  /* TODO get the toggle button to work */
  /* TODO make these styles passable and adjustable */
  /* TODO make the toggle button */
  /* TODO build the toggle button into the table component */
  --table-border: 1px solid rgb(203, 213, 225);
  --cell-background: rgb(250, 250, 250);
  --resize-handle-hover-color: rgb(203, 213, 225);
  --resize-handle-active-color: rgb(71, 80, 94);
  --focus-outline-transition: outline-width 100ms ease-in-out;
  --focus-outline-color: rgb(186, 230, 253);

  width: 100%;
  position: relative;
`

export const Th = styled(Cell)`
  box-sizing: border-box;
  position: relative;
  border-bottom-width: 2px;
  background: white;
  border-top: var(--table-border);
  justify-content: flex-start;
`

export const ColTitle = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  white-space: nowrap;
  margin: 0;
`

export const ResizeHandle = styled.div<{ active: boolean }>`
  display: block;
  position: absolute;
  cursor: col-resize;
  width: 0.5rem;
  height: 100%;
  right: 0;
  top: 0;
  border-right: 2px solid transparent;

  ${({ active }) =>
    active
      ? `border-color: var(--resize-handle-active-color);`
      : `
        &:hover {
          border-color: var(--resize-handle-hover-color);
        }
      `}
`

export const Thead = styled.thead`
  display: contents;
`

export const Tbody = styled.tbody`
  display: contents;
`

const Rows: FC<{
  rows: Row[]
  handleToggleBtnClick: (
    key: string | number,
    e: MouseEvent<HTMLButtonElement>
  ) => void
  expandableRows: boolean
  openRowKey: string | number | null
  /** Necessary to set the keys correctly in the afterRows table */
  keyIndexOffset?: number
}> = ({
  handleToggleBtnClick,
  expandableRows,
  openRowKey,
  rows,
  keyIndexOffset = 0,
}) => (
  <>
    {rows.map((row, i) => {
      const key = row.key ?? i + keyIndexOffset

      return (
        <RowContainer key={key}>
          {expandableRows && (
            <Cell>
              <RowToggleBtn
                open={key === openRowKey}
                onClick={(e) => handleToggleBtnClick(key, e)}
              />
            </Cell>
          )}
          {row.cells.map((cell, j) => (
            <Cell key={j}>{cell}</Cell>
          ))}
        </RowContainer>
      )
    })}
  </>
)

const Table: FC<TableProps> = ({
  rows,
  columns,
  className,
  getColId,
  expandedRowClassName,
  secondTablePartClassName,
  wrapperClassName,
  expandableRows = false,
  id,
  minCellWidth,
  overflowFix = false,
}) => {
  // Props validation
  if (!expandableRows) {
    if (rows.some(({ expanded }) => expanded !== undefined)) {
      throw new Error(
        'the expanded property cannot be defined for any row if expandableRows is not enabled.'
      )
    }
  }

  /** Horizontal scroll position of the table elements. Used to synchronize the scroll positions of
   * the bottom and top table parts. */
  const [scrollLeft, setScrollLeft] = useState(0)
  /** Ref to the scrollable div containing the second HTML table element (containing invoices after the open row). */
  const secondTableRef = useRef<HTMLTableElement>(null)
  let { gridTemplateColumns, colRefs, mouseDown, activeIndex, tableRef } =
    useResizableTable(columns, minCellWidth)
  const [openRowKey, setOpenRowKey] = useState<string | number | null>(null)

  // When using expandable rows, we have the additional column containing the toggle buttons
  if (expandableRows) gridTemplateColumns = `min-content ${gridTemplateColumns}`

  function handleScroll(e: React.UIEvent<HTMLTableElement>) {
    setScrollLeft(e.currentTarget.scrollLeft)
  }

  // Synchronize the scroll positions of the bottom and top table parts
  useEffect(() => {
    // console.log(firstTable.current)
    if (tableRef.current !== null) tableRef.current.scrollLeft = scrollLeft
    if (secondTableRef.current !== null)
      secondTableRef.current.scrollLeft = scrollLeft
  }, [scrollLeft, openRowKey, tableRef])

  const openRowIndex =
    openRowKey !== null && openRowKey !== undefined
      ? rows.findIndex(({ key }, i) => (key ?? i) === openRowKey)
      : null
  const openRow = openRowIndex !== null ? rows[openRowIndex] : null

  // When a row is open, we have to divide the table into two separate `table` components and
  // display the open row between them.
  const beforeRows =
    openRowIndex !== null
      ? rows.slice(
          0,
          // All the rows up to and including the open row will be shown before the expanded section
          openRowIndex + 1
        )
      : rows

  const afterRows = openRowIndex !== null ? rows.slice(openRowIndex + 1) : []

  function handleToggleBtnClick(
    key: string | number,
    e: MouseEvent<HTMLButtonElement>
  ) {
    setOpenRowKey((prev) => (prev === key ? null : key))
  }

  return (
    <Wrapper className={wrapperClassName}>
      <TableEl
        overflowFix={overflowFix}
        className={className}
        ref={tableRef}
        style={{ gridTemplateColumns }}
        id={id}
        // Plus 1 for the thead row
        numRows={beforeRows.length + 1}
        onScroll={handleScroll}
      >
        <Thead>
          {/* Note that this row does not have a key. Key indexing starts with the first data row. */}
          <RowContainer>
            {expandableRows && <Th as="th" />}
            {columns.map((col, i) => (
              <Th
                as="th"
                key={i}
                ref={(el) => {
                  colRefs.current[i] = el
                }}
                id={id ?? getColId?.(col, i, id)}
              >
                <ColTitle>{typeof col === 'string' ? col : col.name}</ColTitle>
                {(typeof col === 'string' || !col.fixedSize) && (
                  <ResizeHandle
                    active={i === activeIndex}
                    onMouseDown={() => mouseDown(i)}
                  />
                )}
              </Th>
            ))}
          </RowContainer>
        </Thead>
        <Tbody>
          <Rows
            rows={beforeRows}
            {...{ expandableRows, handleToggleBtnClick, openRowKey }}
          />
        </Tbody>
      </TableEl>
      {openRow !== null && (
        <>
          <ExpandedRow className={expandedRowClassName}>
            {openRow.expanded}
          </ExpandedRow>
          <TableEl
            overflowFix={overflowFix}
            style={{ gridTemplateColumns }}
            numRows={afterRows.length}
            ref={secondTableRef}
            onScroll={handleScroll}
            className={secondTablePartClassName}
          >
            <Tbody>
              <Rows
                rows={afterRows}
                keyIndexOffset={beforeRows.length}
                {...{ expandableRows, handleToggleBtnClick, openRowKey }}
              />
            </Tbody>
          </TableEl>
        </>
      )}
    </Wrapper>
  )
}

export default Table
