"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
exports.default = styled_components_1.default.td `
  box-sizing: border-box;
  display: flex;
  padding: 0.5rem;
  flex-direction: row;
  align-items: center;
  justify-items: stretch;
  background: var(--cell-background);
  white-space: nowrap;
  border: var(--table-border);
  border-style: none none solid solid;
  height: var(--row-height);
  overflow-y: visible;

  &:last-child {
    border-right: var(--table-border);
  }
`;
