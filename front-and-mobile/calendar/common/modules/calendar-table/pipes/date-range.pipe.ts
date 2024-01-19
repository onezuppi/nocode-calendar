import { Pipe, PipeTransform } from '@angular/core';
import { IDateRange } from '../utils';
import { dateToFormat } from '@abanking/core';

@Pipe({
    name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {
    /**
     * Преобразование даты
     * @param {IDateRange[]} date
     * @returns {string}
     */
    public transform(date: IDateRange | null): string {
        if (!date) {
            return '';
        }

        if (date.from.getMonth() === date.to.getMonth()){
            return dateToFormat(date.from, 'MMMM YYYY');
        }


        return `${dateToFormat(date.from, 'MMMM')} - ${dateToFormat(date.to, 'MMMM')} ${dateToFormat(date.from, 'YYYY')}`;
    }
}
