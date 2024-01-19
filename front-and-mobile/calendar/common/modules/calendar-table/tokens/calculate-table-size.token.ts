import { InjectionToken } from '@angular/core';
import { calculateTableSize, CalculateTableSizeFn } from '../utils';

export const CALCULATE_TABLE_SIZE_TOKEN: InjectionToken<CalculateTableSizeFn> = new InjectionToken<CalculateTableSizeFn>(
    'CALCULATE_TABLE_SIZE_TOKEN', { factory: () => calculateTableSize });
