"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const bs_1 = require("react-icons/bs");
const styled_components_1 = __importDefault(require("styled-components"));
const Button = styled_components_1.default.button `
  --transition-duration: 0.1s;
  border: none;
  height: 1rem;
  width: 1rem;
  background-color: transparent;
  visibility: initial;
  opacity: 0;
  /** Notice how visibility has a delay transition so it becomes visible again only after it fades in. */
  transition: visibility 0s var(--transition-duration),
    opacity var(--transition-duration), transform var(--transition-duration),
    var(--focus-outline-transition);
  outline-color: var(--focus-outline-color);
  outline-style: solid;
  outline-width: 0;
  border-radius: 2px;

  &:focus {
    outline-width: 2px;
  }

  tr:hover &,
  &:focus ${({ open }) => open && `, &`} {
    transition: visibility 0s, opacity var(--transition-duration),
      transform var(--transition-duration), var(--focus-outline-transition);
    visibility: visible;
    opacity: 1;
  }

  ${({ open }) => open && `transform: rotate(0.25turn);`}
`;
const RowToggleBtn = (props) => (react_1.default.createElement(Button, Object.assign({}, props, { type: "button" }),
    react_1.default.createElement(bs_1.BsChevronRight, { size: "1rem" })));
exports.default = RowToggleBtn;
