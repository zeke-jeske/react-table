"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importDefault(require("styled-components"));
exports.default = styled_components_1.default.td(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  box-sizing: border-box;\n  display: flex;\n  padding: 0.5rem;\n  flex-direction: row;\n  align-items: center;\n  justify-items: stretch;\n  background: var(--cell-background);\n  white-space: nowrap;\n  border: var(--table-border);\n  border-style: none none solid solid;\n  height: var(--row-height);\n  overflow-y: visible;\n\n  &:last-child {\n    border-right: var(--table-border);\n  }\n"], ["\n  box-sizing: border-box;\n  display: flex;\n  padding: 0.5rem;\n  flex-direction: row;\n  align-items: center;\n  justify-items: stretch;\n  background: var(--cell-background);\n  white-space: nowrap;\n  border: var(--table-border);\n  border-style: none none solid solid;\n  height: var(--row-height);\n  overflow-y: visible;\n\n  &:last-child {\n    border-right: var(--table-border);\n  }\n"])));
var templateObject_1;
