"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/** Default minimum cell width, in pixels. */
const DEFAULT_MIN_CELL_WIDTH = 144;
function getTemplateColumns(columns, minCellWidth) {
    return columns.map((col) => {
        if (typeof col === 'string' || !col.fixedSize)
            return `minmax(${minCellWidth}px, 1fr)`;
        // Fixed size
        return 'min-content';
    });
}
/** A React custom hook that helps manage a table with resizable columns. */
function useResizableTable(columns, minCellWidth = DEFAULT_MIN_CELL_WIDTH) {
    /** Index of the column resizer that's currently being adjusted. */
    const [activeIndex, setActiveIndex] = (0, react_1.useState)(null);
    /** Ref to an array of HTML column element references. */
    const colRefs = (0, react_1.useRef)([]);
    /** Ref to the table itself */
    const tableRef = (0, react_1.useRef)(null);
    // Get the initial grid template columns
    const [gridTemplateColumns, setGridTemplateColumns] = (0, react_1.useState)(() => getTemplateColumns(columns, minCellWidth));
    // Update colRefs when columns changes
    (0, react_1.useEffect)(() => {
        if (columns.length > colRefs.current.length) {
            // If there are more columns, create the refs
            colRefs.current = [
                ...colRefs.current,
                ...new Array(columns.length - colRefs.current.length).fill(null),
            ];
        }
        else if (columns.length < colRefs.current.length) {
            // If there are less columns, remove the extras.
            colRefs.current = colRefs.current.slice(0, columns.length);
        }
    }, [columns]);
    /**
     * Handler for mousedown on the column resize handle.
     * @param i the index of the column for which the event occurred.
     */
    function mouseDown(i) {
        setActiveIndex(i);
    }
    // Manage the window event listeners
    (0, react_1.useEffect)(() => {
        function mouseMove(e) {
            e.preventDefault();
            if (activeIndex === null)
                return;
            // Get the current widths of all the columns
            const widths = colRefs.current.map((colEl) => colEl.offsetWidth);
            const activeCol = colRefs.current[activeIndex];
            // Calculate the column width
            let newColWidth = e.clientX - activeCol.getBoundingClientRect().left;
            if (newColWidth < minCellWidth)
                newColWidth = minCellWidth;
            // Ensure that the columns take up the full width of the table
            const totalWidth = widths.reduce((acc, width) => acc + width, 0);
            const tableWidth = tableRef.current.offsetWidth;
            if (totalWidth < tableWidth) {
                widths[activeIndex] += tableWidth - totalWidth;
            }
            // Make the update. Only the grid-template-column value corresponding to the modified column will be changed.
            const newGridTemplateColumns = [...gridTemplateColumns];
            newGridTemplateColumns[activeIndex] = `minmax(${newColWidth}px, 1fr)`;
            setGridTemplateColumns(newGridTemplateColumns);
        }
        function removeListeners() {
            window.removeEventListener('mousemove', mouseMove);
            // eslint-disable-next-line no-use-before-define
            window.removeEventListener('mouseup', mouseUp);
        }
        function mouseUp() {
            setActiveIndex(null);
            removeListeners();
        }
        if (activeIndex !== null) {
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
        }
        return () => {
            removeListeners();
        };
    }, [activeIndex, gridTemplateColumns, minCellWidth]);
    return {
        gridTemplateColumns: gridTemplateColumns.join(' '),
        mouseDown,
        colRefs,
        activeIndex,
        tableRef,
    };
}
exports.default = useResizableTable;
