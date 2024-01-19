import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'calendar-snow',
    styleUrls: ['./styles/snow.web.master.scss'],
    templateUrl: './snow.web.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgFor
    ],
})
export class SnowWebComponent {

    public snowList: string[] = [];

    constructor() {
        const snowMainType: string[] = ['❅', '❅', '❅', '❅', '❅', '*', '*', '*', '❄', '❄', '❆'];
        const min: number = 1;
        const max: number = snowMainType.length;
        const listLength: number = 250;

        Array.from({ length: listLength }).forEach((i: unknown, index: number) => {
            this.snowList[index] = snowMainType[Math.floor(Math.random() * (max - min + 1)) + min];
        });

        this.snowList[Math.floor(Math.random() * (listLength - min)) + min] = '✺';
        this.snowList[Math.floor(Math.random() * (listLength - min)) + min] = '❈';
        this.snowList[Math.floor(Math.random() * (listLength - min)) + min] = '✺';
        this.snowList[Math.floor(Math.random() * (listLength - min)) + min] = '☃';
    }
}
