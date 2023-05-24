type Column =
  | {
      name: string | import('react').ReactNode
      /** If true, this column won't be allowed to be resized in width and won't change width when the table gets bigger or smaller. */
      fixedSize?: boolean
      /** Specifies the HTML ID of this column's `th` element. If undefined, it defaults to determining
       * the ID using the `getColId` method of `TableProps`. If that is also undefined, `id` is not
       * set on the column. */
      id?: string
    }
  | string

interface Row {
  cells: import('react').ReactNode[]
  expanded?: import('react').ReactNode
  /** An identifier to keep track of this row. If undefined, the index will be used. */
  key?: string | number
}

interface TableProps {
  columns: Column[]
  /** `className` to set on the HTML `table` element itself */
  className?: string
  /** ID of the `table` element. */
  id: string
  /** If true, rows will each get a toggle button that allows it to show additional contents.
   * Default false. */
  expandableRows?: boolean
  /**
   * If true, the table will be wrapped in a series of `div`s that allow it to scroll horizontally
   * while still allowing `overflow-y: visible`. Default false. Enable if you intend to have any
   * elements in the table such as popups or tooltips that extend outside the table's lower boundary.
   */
  overflowFix?: boolean
  getColId?: (col: Column, colIndex: number, tableId: string) => string
  rows: Row[]
  expandedRowClassName?: string
  /** When a row is expanded, this `className` will be set on the second half of the table below the
   * expanded section. */
  secondTablePartClassName?: string
  /** This `className` is set on the `div` that contains the entire table. */
  wrapperClassName?: string
  /** In pixels. Doesn't apply to fixedSize columns. */
  minCellWidth?: number
}
