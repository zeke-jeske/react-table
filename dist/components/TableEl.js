"use strict";
// see https://medium.com/@justicart/overflow-x-scroll-overflow-y-visible-c1a98238e002
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const noScrollbar_1 = __importDefault(require("../lib/noScrollbar"));
// CONSTANTS
const ROW_HEIGHT = '3rem';
// STYLED COMPONENTS
const Placeholder = styled_components_1.default.div `
  height: ${({ tableHeight }) => tableHeight};
  box-sizing: border-box;
  position: relative;
`;
const OverflowContainer = styled_components_1.default.div `
  height: calc(${({ tableHeight }) => tableHeight} + 200px);
  box-sizing: border-box;
  overflow-x: auto;
  position: absolute;
  top: 0;
  width: 100%;

  ${noScrollbar_1.default}
`;
const El = styled_components_1.default.table `
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
  ${noScrollbar_1.default}

  ${({ overflowFix }) => overflowFix &&
    `
      position: absolute;
      top: 0;
      overflow: visible;
    `}
`;
// COMPONENT
const TableEl = (0, react_1.forwardRef)((_a, ref) => {
    var { children, numRows, onScroll, overflowFix } = _a, props = __rest(_a, ["children", "numRows", "onScroll", "overflowFix"]);
    const tableHeight = `calc(${ROW_HEIGHT} * ${numRows})`;
    if (overflowFix) {
        return (react_1.default.createElement(Placeholder, { numRows: numRows, tableHeight: tableHeight },
            react_1.default.createElement(OverflowContainer, { onScroll: onScroll, ref: ref, tableHeight: tableHeight },
                react_1.default.createElement(El, Object.assign({ numRows: numRows, tableHeight: tableHeight, rowHeight: ROW_HEIGHT, overflowFix: true }, props), children))));
    }
    return (react_1.default.createElement(El, Object.assign({ numRows: numRows, tableHeight: tableHeight, rowHeight: ROW_HEIGHT, ref: ref, onScroll: onScroll }, props), children));
});
TableEl.displayName = 'TableEl';
exports.default = TableEl;
