/// <reference types="react" />
interface Props extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    numRows: number;
    overflowFix: boolean;
}
declare const TableEl: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLTableElement | null>>;
export default TableEl;
//# sourceMappingURL=TableEl.d.ts.map