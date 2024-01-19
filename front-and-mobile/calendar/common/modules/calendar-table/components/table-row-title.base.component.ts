import { Directive, inject } from '@angular/core';
import { OUTLET_COMPONENT_PARAMS } from '@abanking/core';

export interface ITableRowParams {
    readonly index: number;
}

@Directive()
export class TableRowTitleBaseComponent {
    public readonly data: ITableRowParams = inject(OUTLET_COMPONENT_PARAMS) as ITableRowParams;
}
