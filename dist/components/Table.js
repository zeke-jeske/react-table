"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tbody = exports.Thead = exports.ResizeHandle = exports.ColTitle = exports.Th = exports.Wrapper = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = require("styled-components");
const useResizableTable_1 = __importDefault(require("../lib/useResizableTable"));
const Cell_1 = __importDefault(require("./Cell"));
const TableEl_1 = __importDefault(require("./TableEl"));
const Row_1 = __importDefault(require("./Row"));
const ExpandedRow_1 = __importDefault(require("./ExpandedRow"));
const RowToggleBtn_1 = __importDefault(require("./RowToggleBtn"));
exports.Wrapper = styled_components_1.styled.div `
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
`;
exports.Th = (0, styled_components_1.styled)(Cell_1.default) `
  box-sizing: border-box;
  position: relative;
  border-bottom-width: 2px;
  background: white;
  border-top: var(--table-border);
  justify-content: flex-start;
`;
exports.ColTitle = styled_components_1.styled.p `
  text-transform: uppercase;
  font-weight: bold;
  white-space: nowrap;
  margin: 0;
`;
exports.ResizeHandle = styled_components_1.styled.div `
  display: block;
  position: absolute;
  cursor: col-resize;
  width: 0.5rem;
  height: 100%;
  right: 0;
  top: 0;
  border-right: 2px solid transparent;

  ${({ active }) => active
    ? `border-color: var(--resize-handle-active-color);`
    : `
        &:hover {
          border-color: var(--resize-handle-hover-color);
        }
      `}
`;
exports.Thead = styled_components_1.styled.thead `
  display: contents;
`;
exports.Tbody = styled_components_1.styled.tbody `
  display: contents;
`;
const Rows = ({ handleToggleBtnClick, expandableRows, openRowKey, rows, keyIndexOffset = 0, }) => (react_1.default.createElement(react_1.default.Fragment, null, rows.map((row, i) => {
    var _a;
    const key = (_a = row.key) !== null && _a !== void 0 ? _a : i + keyIndexOffset;
    return (react_1.default.createElement(Row_1.default, { key: key },
        expandableRows && (react_1.default.createElement(Cell_1.default, null,
            react_1.default.createElement(RowToggleBtn_1.default, { open: key === openRowKey, onClick: () => handleToggleBtnClick(key) }))),
        row.cells.map((cell, j) => (react_1.default.createElement(Cell_1.default, { key: j }, cell)))));
})));
const Table = ({ rows, columns, className, getColId, expandedRowClassName, secondTablePartClassName, wrapperClassName, expandableRows = false, id, minCellWidth, overflowFix = false, }) => {
    // Props validation
    if (!expandableRows) {
        if (rows.some(({ expanded }) => expanded !== undefined)) {
            throw new Error('the expanded property cannot be defined for any row if expandableRows is not enabled.');
        }
    }
    /** Horizontal scroll position of the table elements. Used to synchronize the scroll positions of
     * the bottom and top table parts. */
    const [scrollLeft, setScrollLeft] = (0, react_1.useState)(0);
    /** Ref to the scrollable div containing the second HTML table element (containing invoices after the open row). */
    const secondTableRef = (0, react_1.useRef)(null);
    const resizableTableStuff = (0, useResizableTable_1.default)(columns, minCellWidth);
    let { gridTemplateColumns } = resizableTableStuff;
    const { colRefs, mouseDown, activeIndex, tableRef } = resizableTableStuff;
    const [openRowKey, setOpenRowKey] = (0, react_1.useState)(null);
    // When using expandable rows, we have the additional column containing the toggle buttons
    if (expandableRows)
        gridTemplateColumns = `min-content ${gridTemplateColumns}`;
    function handleScroll(e) {
        setScrollLeft(e.currentTarget.scrollLeft);
    }
    // Synchronize the scroll positions of the bottom and top table parts
    (0, react_1.useEffect)(() => {
        // console.log(firstTable.current)
        if (tableRef.current !== null)
            tableRef.current.scrollLeft = scrollLeft;
        if (secondTableRef.current !== null)
            secondTableRef.current.scrollLeft = scrollLeft;
    }, [scrollLeft, openRowKey, tableRef]);
    const openRowIndex = openRowKey !== null && openRowKey !== undefined
        ? rows.findIndex(({ key }, i) => (key !== null && key !== void 0 ? key : i) === openRowKey)
        : null;
    const openRow = openRowIndex !== null ? rows[openRowIndex] : null;
    // When a row is open, we have to divide the table into two separate `table` components and
    // display the open row between them.
    const beforeRows = openRowIndex !== null
        ? rows.slice(0, 
        // All the rows up to and including the open row will be shown before the expanded section
        openRowIndex + 1)
        : rows;
    const afterRows = openRowIndex !== null ? rows.slice(openRowIndex + 1) : [];
    function handleToggleBtnClick(key) {
        setOpenRowKey((prev) => (prev === key ? null : key));
    }
    return (react_1.default.createElement(exports.Wrapper, { className: wrapperClassName },
        react_1.default.createElement(TableEl_1.default, { overflowFix: overflowFix, className: className, ref: tableRef, style: { gridTemplateColumns }, id: id, 
            // Plus 1 for the thead row
            numRows: beforeRows.length + 1, onScroll: handleScroll },
            react_1.default.createElement(exports.Thead, null,
                react_1.default.createElement(Row_1.default, null,
                    expandableRows && react_1.default.createElement(exports.Th, { as: "th" }),
                    columns.map((col, i) => (react_1.default.createElement(exports.Th, { as: "th", key: i, ref: (el) => {
                            colRefs.current[i] = el;
                        }, id: id !== null && id !== void 0 ? id : getColId === null || getColId === void 0 ? void 0 : getColId(col, i, id) },
                        react_1.default.createElement(exports.ColTitle, null, typeof col === 'string' ? col : col.name),
                        (typeof col === 'string' || !col.fixedSize) && (react_1.default.createElement(exports.ResizeHandle, { active: i === activeIndex, onMouseDown: () => mouseDown(i) }))))))),
            react_1.default.createElement(exports.Tbody, null,
                react_1.default.createElement(Rows, Object.assign({ rows: beforeRows }, { expandableRows, handleToggleBtnClick, openRowKey })))),
        openRow !== null && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ExpandedRow_1.default, { className: expandedRowClassName }, openRow.expanded),
            react_1.default.createElement(TableEl_1.default, { overflowFix: overflowFix, style: { gridTemplateColumns }, numRows: afterRows.length, ref: secondTableRef, onScroll: handleScroll, className: secondTablePartClassName },
                react_1.default.createElement(exports.Tbody, null,
                    react_1.default.createElement(Rows, Object.assign({ rows: afterRows, keyIndexOffset: beforeRows.length }, { expandableRows, handleToggleBtnClick, openRowKey }))))))));
};
exports.default = Table;
