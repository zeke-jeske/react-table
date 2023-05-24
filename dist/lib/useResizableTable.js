var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect, useRef, useState } from 'react';
/** Default minimum cell width, in pixels. */
var DEFAULT_MIN_CELL_WIDTH = 144;
function getTemplateColumns(columns, minCellWidth) {
    return columns.map(function (col) {
        if (typeof col === 'string' || !col.fixedSize)
            return "minmax(".concat(minCellWidth, "px, 1fr)");
        // Fixed size
        return 'min-content';
    });
}
/** A React custom hook that helps manage a table with resizable columns. */
export function useResizableTable(columns, minCellWidth) {
    if (minCellWidth === void 0) { minCellWidth = DEFAULT_MIN_CELL_WIDTH; }
    /** Index of the column resizer that's currently being adjusted. */
    var _a = useState(null), activeIndex = _a[0], setActiveIndex = _a[1];
    /** Ref to an array of HTML column element references. */
    var colRefs = useRef([]);
    /** Ref to the table itself */
    var tableRef = useRef(null);
    // Get the initial grid template columns
    var _b = useState(function () {
        return getTemplateColumns(columns, minCellWidth);
    }), gridTemplateColumns = _b[0], setGridTemplateColumns = _b[1];
    // Update colRefs when columns changes
    useEffect(function () {
        if (columns.length > colRefs.current.length) {
            // If there are more columns, create the refs
            colRefs.current = __spreadArray(__spreadArray([], colRefs.current, true), new Array(columns.length - colRefs.current.length).fill(null), true);
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
    function mouseMove(e) {
        e.preventDefault();
        if (activeIndex === null)
            return;
        // Get the current widths of all the columns
        var widths = colRefs.current.map(function (colEl) { return colEl.offsetWidth; });
        var activeCol = colRefs.current[activeIndex];
        // Calculate the column width
        var newColWidth = e.clientX - activeCol.getBoundingClientRect().left;
        if (newColWidth < minCellWidth)
            newColWidth = minCellWidth;
        // Ensure that the columns take up the full width of the table
        var totalWidth = widths.reduce(function (acc, width) { return acc + width; }, 0);
        var tableWidth = tableRef.current.offsetWidth;
        if (totalWidth < tableWidth) {
            widths[activeIndex] += tableWidth - totalWidth;
        }
        // Make the update. Only the grid-template-column value corresponding to the modified column will be changed.
        var newGridTemplateColumns = __spreadArray([], gridTemplateColumns, true);
        newGridTemplateColumns[activeIndex] = "minmax(".concat(newColWidth, "px, 1fr)");
        setGridTemplateColumns(newGridTemplateColumns);
    }
    function removeListeners() {
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', removeListeners);
    }
    function mouseUp() {
        setActiveIndex(null);
        removeListeners();
    }
    // Manage the window event listeners
    useEffect(function () {
        if (activeIndex !== null) {
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
        }
        return function () {
            removeListeners();
        };
    }, [activeIndex]);
    return {
        gridTemplateColumns: gridTemplateColumns.join(' '),
        mouseDown: mouseDown,
        colRefs: colRefs,
        activeIndex: activeIndex,
        tableRef: tableRef,
    };
}
