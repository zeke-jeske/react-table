import { useEffect, useRef, useState } from 'react'

/** Default minimum cell width, in pixels. */
const DEFAULT_MIN_CELL_WIDTH = 144

function getTemplateColumns(columns: Column[], minCellWidth: number) {
  return columns.map((col) => {
    if (typeof col === 'string' || !col.fixedSize)
      return `minmax(${minCellWidth}px, 1fr)`
    // Fixed size
    return 'min-content'
  })
}

/** A React custom hook that helps manage a table with resizable columns. */
export function useResizableTable(
  columns: Column[],
  minCellWidth: number = DEFAULT_MIN_CELL_WIDTH
) {
  /** Index of the column resizer that's currently being adjusted. */
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  /** Ref to an array of HTML column element references. */
  const colRefs = useRef<(HTMLTableCellElement | null)[]>([])
  /** Ref to the table itself */
  const tableRef = useRef<HTMLTableElement>(null)

  // Get the initial grid template columns
  const [gridTemplateColumns, setGridTemplateColumns] = useState(() =>
    getTemplateColumns(columns, minCellWidth)
  )

  // Update colRefs when columns changes
  useEffect(() => {
    if (columns.length > colRefs.current.length) {
      // If there are more columns, create the refs
      colRefs.current = [
        ...colRefs.current,
        ...(new Array(columns.length - colRefs.current.length).fill(
          null
        ) as null[]),
      ]
    } else if (columns.length < colRefs.current.length) {
      // If there are less columns, remove the extras.
      colRefs.current = colRefs.current.slice(0, columns.length)
    }
  }, [columns])

  /**
   * Handler for mousedown on the column resize handle.
   * @param i the index of the column for which the event occurred.
   */
  function mouseDown(i: number) {
    setActiveIndex(i)
  }

  function mouseMove(e: MouseEvent) {
    e.preventDefault()
    if (activeIndex === null) return

    // Get the current widths of all the columns
    const widths = colRefs.current.map(
      (colEl) => (colEl as HTMLTableCellElement).offsetWidth
    )

    const activeCol = colRefs.current[activeIndex] as HTMLTableCellElement

    // Calculate the column width
    let newColWidth = e.clientX - activeCol.getBoundingClientRect().left
    if (newColWidth < minCellWidth) newColWidth = minCellWidth

    // Ensure that the columns take up the full width of the table
    const totalWidth = widths.reduce((acc, width) => acc + width, 0)
    const tableWidth = (tableRef.current as HTMLTableElement).offsetWidth

    if (totalWidth < tableWidth) {
      widths[activeIndex] += tableWidth - totalWidth
    }

    // Make the update. Only the grid-template-column value corresponding to the modified column will be changed.
    const newGridTemplateColumns = [...gridTemplateColumns]
    newGridTemplateColumns[activeIndex] = `minmax(${newColWidth}px, 1fr)`

    setGridTemplateColumns(newGridTemplateColumns)
  }

  function removeListeners() {
    window.removeEventListener('mousemove', mouseMove)
    window.removeEventListener('mouseup', removeListeners)
  }

  function mouseUp() {
    setActiveIndex(null)
    removeListeners()
  }

  // Manage the window event listeners
  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener('mousemove', mouseMove)
      window.addEventListener('mouseup', mouseUp)
    }

    return () => {
      removeListeners()
    }
  }, [activeIndex])

  return {
    gridTemplateColumns: gridTemplateColumns.join(' '),
    mouseDown,
    colRefs,
    activeIndex,
    tableRef,
  }
}
