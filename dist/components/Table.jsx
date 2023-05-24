var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { useState, useRef, useEffect } from 'react';
import { useResizableTable } from '../lib/useResizableTable';
import { styled } from 'styled-components';
import Cell from './Cell';
import TableEl from './TableEl';
import RowContainer from './Row';
import ExpandedRow from './ExpandedRow';
import RowToggleBtn from './RowToggleBtn';
export var Wrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  /* TODO fix hydration errors */\n  /* TODO get the toggle button to work */\n  /* TODO make these styles passable and adjustable */\n  /* TODO make the toggle button */\n  /* TODO build the toggle button into the table component */\n  --table-border: 1px solid rgb(203, 213, 225);\n  --cell-background: rgb(250, 250, 250);\n  --resize-handle-hover-color: rgb(203, 213, 225);\n  --resize-handle-active-color: rgb(71, 80, 94);\n  --focus-outline-transition: outline-width 100ms ease-in-out;\n  --focus-outline-color: rgb(186, 230, 253);\n\n  width: 100%;\n  position: relative;\n"], ["\n  /* TODO fix hydration errors */\n  /* TODO get the toggle button to work */\n  /* TODO make these styles passable and adjustable */\n  /* TODO make the toggle button */\n  /* TODO build the toggle button into the table component */\n  --table-border: 1px solid rgb(203, 213, 225);\n  --cell-background: rgb(250, 250, 250);\n  --resize-handle-hover-color: rgb(203, 213, 225);\n  --resize-handle-active-color: rgb(71, 80, 94);\n  --focus-outline-transition: outline-width 100ms ease-in-out;\n  --focus-outline-color: rgb(186, 230, 253);\n\n  width: 100%;\n  position: relative;\n"])));
export var Th = styled(Cell)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  box-sizing: border-box;\n  position: relative;\n  border-bottom-width: 2px;\n  background: white;\n  border-top: var(--table-border);\n  justify-content: flex-start;\n"], ["\n  box-sizing: border-box;\n  position: relative;\n  border-bottom-width: 2px;\n  background: white;\n  border-top: var(--table-border);\n  justify-content: flex-start;\n"])));
export var ColTitle = styled.p(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  text-transform: uppercase;\n  font-weight: bold;\n  white-space: nowrap;\n  margin: 0;\n"], ["\n  text-transform: uppercase;\n  font-weight: bold;\n  white-space: nowrap;\n  margin: 0;\n"])));
export var ResizeHandle = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: block;\n  position: absolute;\n  cursor: col-resize;\n  width: 0.5rem;\n  height: 100%;\n  right: 0;\n  top: 0;\n  border-right: 2px solid transparent;\n\n  ", "\n"], ["\n  display: block;\n  position: absolute;\n  cursor: col-resize;\n  width: 0.5rem;\n  height: 100%;\n  right: 0;\n  top: 0;\n  border-right: 2px solid transparent;\n\n  ", "\n"])), function (_a) {
    var active = _a.active;
    return active
        ? "border-color: var(--resize-handle-active-color);"
        : "\n        &:hover {\n          border-color: var(--resize-handle-hover-color);\n        }\n      ";
});
export var Thead = styled.thead(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: contents;\n"], ["\n  display: contents;\n"])));
export var Tbody = styled.tbody(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: contents;\n"], ["\n  display: contents;\n"])));
var Rows = function (_a) {
    var handleToggleBtnClick = _a.handleToggleBtnClick, expandableRows = _a.expandableRows, openRowKey = _a.openRowKey, rows = _a.rows, _b = _a.keyIndexOffset, keyIndexOffset = _b === void 0 ? 0 : _b;
    return (<>
    {rows.map(function (row, i) {
            var _a;
            var key = (_a = row.key) !== null && _a !== void 0 ? _a : i + keyIndexOffset;
            return (<RowContainer key={key}>
          {expandableRows && (<Cell>
              <RowToggleBtn open={key === openRowKey} onClick={function (e) { return handleToggleBtnClick(key, e); }}/>
            </Cell>)}
          {row.cells.map(function (cell, j) { return (<Cell key={j}>{cell}</Cell>); })}
        </RowContainer>);
        })}
  </>);
};
var Table = function (_a) {
    var rows = _a.rows, columns = _a.columns, className = _a.className, getColId = _a.getColId, expandedRowClassName = _a.expandedRowClassName, secondTablePartClassName = _a.secondTablePartClassName, wrapperClassName = _a.wrapperClassName, _b = _a.expandableRows, expandableRows = _b === void 0 ? false : _b, id = _a.id, minCellWidth = _a.minCellWidth, _c = _a.overflowFix, overflowFix = _c === void 0 ? false : _c;
    // Props validation
    if (!expandableRows) {
        if (rows.some(function (_a) {
            var expanded = _a.expanded;
            return expanded !== undefined;
        })) {
            throw new Error('the expanded property cannot be defined for any row if expandableRows is not enabled.');
        }
    }
    /** Horizontal scroll position of the table elements. Used to synchronize the scroll positions of
     * the bottom and top table parts. */
    var _d = useState(0), scrollLeft = _d[0], setScrollLeft = _d[1];
    /** Ref to the scrollable div containing the second HTML table element (containing invoices after the open row). */
    var secondTableRef = useRef(null);
    var _e = useResizableTable(columns, minCellWidth), gridTemplateColumns = _e.gridTemplateColumns, colRefs = _e.colRefs, mouseDown = _e.mouseDown, activeIndex = _e.activeIndex, tableRef = _e.tableRef;
    var _f = useState(null), openRowKey = _f[0], setOpenRowKey = _f[1];
    // When using expandable rows, we have the additional column containing the toggle buttons
    if (expandableRows)
        gridTemplateColumns = "min-content ".concat(gridTemplateColumns);
    function handleScroll(e) {
        setScrollLeft(e.currentTarget.scrollLeft);
    }
    // Synchronize the scroll positions of the bottom and top table parts
    useEffect(function () {
        // console.log(firstTable.current)
        if (tableRef.current !== null)
            tableRef.current.scrollLeft = scrollLeft;
        if (secondTableRef.current !== null)
            secondTableRef.current.scrollLeft = scrollLeft;
    }, [scrollLeft, openRowKey, tableRef]);
    var openRowIndex = openRowKey !== null && openRowKey !== undefined
        ? rows.findIndex(function (_a, i) {
            var key = _a.key;
            return (key !== null && key !== void 0 ? key : i) === openRowKey;
        })
        : null;
    var openRow = openRowIndex !== null ? rows[openRowIndex] : null;
    // When a row is open, we have to divide the table into two separate `table` components and
    // display the open row between them.
    var beforeRows = openRowIndex !== null
        ? rows.slice(0, 
        // All the rows up to and including the open row will be shown before the expanded section
        openRowIndex + 1)
        : rows;
    var afterRows = openRowIndex !== null ? rows.slice(openRowIndex + 1) : [];
    function handleToggleBtnClick(key, e) {
        setOpenRowKey(function (prev) { return (prev === key ? null : key); });
    }
    return (<Wrapper className={wrapperClassName}>
      <TableEl overflowFix={overflowFix} className={className} ref={tableRef} style={{ gridTemplateColumns: gridTemplateColumns }} id={id} 
    // Plus 1 for the thead row
    numRows={beforeRows.length + 1} onScroll={handleScroll}>
        <Thead>
          {/* Note that this row does not have a key. Key indexing starts with the first data row. */}
          <RowContainer>
            {expandableRows && <Th as="th"/>}
            {columns.map(function (col, i) { return (<Th as="th" key={i} ref={function (el) {
                colRefs.current[i] = el;
            }} id={id !== null && id !== void 0 ? id : getColId === null || getColId === void 0 ? void 0 : getColId(col, i, id)}>
                <ColTitle>{typeof col === 'string' ? col : col.name}</ColTitle>
                {(typeof col === 'string' || !col.fixedSize) && (<ResizeHandle active={i === activeIndex} onMouseDown={function () { return mouseDown(i); }}/>)}
              </Th>); })}
          </RowContainer>
        </Thead>
        <Tbody>
          <Rows rows={beforeRows} {...{ expandableRows: expandableRows, handleToggleBtnClick: handleToggleBtnClick, openRowKey: openRowKey }}/>
        </Tbody>
      </TableEl>
      {openRow !== null && (<>
          <ExpandedRow className={expandedRowClassName}>
            {openRow.expanded}
          </ExpandedRow>
          <TableEl overflowFix={overflowFix} style={{ gridTemplateColumns: gridTemplateColumns }} numRows={afterRows.length} ref={secondTableRef} onScroll={handleScroll} className={secondTablePartClassName}>
            <Tbody>
              <Rows rows={afterRows} keyIndexOffset={beforeRows.length} {...{ expandableRows: expandableRows, handleToggleBtnClick: handleToggleBtnClick, openRowKey: openRowKey }}/>
            </Tbody>
          </TableEl>
        </>)}
    </Wrapper>);
};
export default Table;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
