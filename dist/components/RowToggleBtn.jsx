"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bs_1 = require("react-icons/bs");
var styled_components_1 = __importDefault(require("styled-components"));
var Button = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  --transition-duration: 0.1s;\n  border: none;\n  height: 1rem;\n  width: 1rem;\n  background-color: transparent;\n  visibility: initial;\n  opacity: 0;\n  /** Notice how visibility has a delay transition so it becomes visible again only after it fades in. */\n  transition: visibility 0s var(--transition-duration),\n    opacity var(--transition-duration), transform var(--transition-duration),\n    var(--focus-outline-transition);\n  outline-color: var(--focus-outline-color);\n  outline-style: solid;\n  outline-width: 0;\n  border-radius: 2px;\n\n  &:focus {\n    outline-width: 2px;\n  }\n\n  tr:hover &,\n  &:focus ", " {\n    transition: visibility 0s, opacity var(--transition-duration),\n      transform var(--transition-duration), var(--focus-outline-transition);\n    visibility: visible;\n    opacity: 1;\n  }\n\n  ", "\n"], ["\n  --transition-duration: 0.1s;\n  border: none;\n  height: 1rem;\n  width: 1rem;\n  background-color: transparent;\n  visibility: initial;\n  opacity: 0;\n  /** Notice how visibility has a delay transition so it becomes visible again only after it fades in. */\n  transition: visibility 0s var(--transition-duration),\n    opacity var(--transition-duration), transform var(--transition-duration),\n    var(--focus-outline-transition);\n  outline-color: var(--focus-outline-color);\n  outline-style: solid;\n  outline-width: 0;\n  border-radius: 2px;\n\n  &:focus {\n    outline-width: 2px;\n  }\n\n  tr:hover &,\n  &:focus ", " {\n    transition: visibility 0s, opacity var(--transition-duration),\n      transform var(--transition-duration), var(--focus-outline-transition);\n    visibility: visible;\n    opacity: 1;\n  }\n\n  ", "\n"])), function (_a) {
    var open = _a.open;
    return open && ", &";
}, function (_a) {
    var open = _a.open;
    return open && "transform: rotate(0.25turn);";
});
var RowToggleBtn = function (props) { return (<Button {...props} type="button">
    <bs_1.BsChevronRight size="1rem"/>
  </Button>); };
exports.default = RowToggleBtn;
var templateObject_1;
