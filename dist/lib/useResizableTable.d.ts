/// <reference types="react" />
/** A React custom hook that helps manage a table with resizable columns. */
export default function useResizableTable(columns: Column[], minCellWidth?: number): {
    gridTemplateColumns: string;
    mouseDown: (i: number) => void;
    colRefs: import("react").MutableRefObject<(HTMLTableCellElement | null)[]>;
    activeIndex: number | null;
    tableRef: import("react").RefObject<HTMLTableElement>;
};
//# sourceMappingURL=useResizableTable.d.ts.map