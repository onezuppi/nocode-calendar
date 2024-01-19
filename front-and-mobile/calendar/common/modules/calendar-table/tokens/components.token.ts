import { InjectionToken } from '@angular/core';
import { ViewTypesEnum } from '../enums';
import { ICalendarTableViewsComponents } from '../interfaces';

export type ITableComponentTokens = Record<ViewTypesEnum, ICalendarTableViewsComponents | null>

export const COMPONENTS_TOKEN: InjectionToken<ITableComponentTokens> = new InjectionToken('COMPONENTS_TOKEN');
