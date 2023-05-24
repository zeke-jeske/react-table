// see https://medium.com/@justicart/overflow-x-scroll-overflow-y-visible-c1a98238e002
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { forwardRef } from 'react';
import styled from 'styled-components';
import noScrollbar from '../lib/noScrollbar';
// CONSTANTS
var ROW_HEIGHT = '3rem';
// STYLED COMPONENTS
var Placeholder = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: ", ";\n  box-sizing: border-box;\n  position: relative;\n"], ["\n  height: ", ";\n  box-sizing: border-box;\n  position: relative;\n"])), function (_a) {
    var tableHeight = _a.tableHeight;
    return tableHeight;
});
var OverflowContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: calc(", " + 200px);\n  box-sizing: border-box;\n  overflow-x: auto;\n  position: absolute;\n  top: 0;\n  width: 100%;\n\n  ", "\n"], ["\n  height: calc(", " + 200px);\n  box-sizing: border-box;\n  overflow-x: auto;\n  position: absolute;\n  top: 0;\n  width: 100%;\n\n  ", "\n"])), function (_a) {
    var tableHeight = _a.tableHeight;
    return tableHeight;
}, noScrollbar);
var El = styled.table(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  height: ", ";\n  box-sizing: border-box;\n  min-width: 100%;\n  font-size: 0.8rem;\n  display: grid;\n  grid-template-rows: repeat(\n    ", ",\n    ", "\n  );\n\n  overflow-x: auto;\n  ", "\n\n  ", "\n"], ["\n  height: ", ";\n  box-sizing: border-box;\n  min-width: 100%;\n  font-size: 0.8rem;\n  display: grid;\n  grid-template-rows: repeat(\n    ", ",\n    ", "\n  );\n\n  overflow-x: auto;\n  ", "\n\n  ", "\n"
    // COMPONENT
])), function (_a) {
    var tableHeight = _a.tableHeight;
    return tableHeight;
}, function (_a) {
    var numRows = _a.numRows;
    return numRows;
}, function (_a) {
    var rowHeight = _a.rowHeight;
    return rowHeight;
}, noScrollbar, function (_a) {
    var overflowFix = _a.overflowFix;
    return overflowFix &&
        "\n      position: absolute;\n      top: 0;\n      overflow: visible;\n    ";
});
// COMPONENT
export default forwardRef(function TableEl(_a, ref) {
    var children = _a.children, numRows = _a.numRows, onScroll = _a.onScroll, overflowFix = _a.overflowFix, props = __rest(_a, ["children", "numRows", "onScroll", "overflowFix"]);
    var tableHeight = "calc(".concat(ROW_HEIGHT, " * ").concat(numRows, ")");
    if (overflowFix) {
        return (<Placeholder numRows={numRows} tableHeight={tableHeight}>
        <OverflowContainer onScroll={onScroll} ref={ref} tableHeight={tableHeight}>
          <El numRows={numRows} tableHeight={tableHeight} rowHeight={ROW_HEIGHT} overflowFix={true} {...props}>
            {children}
          </El>
        </OverflowContainer>
      </Placeholder>);
    }
    return (<El numRows={numRows} tableHeight={tableHeight} rowHeight={ROW_HEIGHT} ref={ref} onScroll={onScroll} {...props}>
      {children}
    </El>);
});
var templateObject_1, templateObject_2, templateObject_3;
