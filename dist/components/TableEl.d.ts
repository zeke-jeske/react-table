import React from 'react';
interface Props extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    numRows: number;
    overflowFix: boolean;
}
declare const TableEl: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLTableElement | null>>;
export default TableEl;
//# sourceMappingURL=TableEl.d.ts.map