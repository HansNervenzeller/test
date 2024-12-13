import { Observable } from '@nativescript/core';

export class PieChartViewModel extends Observable {
    constructor(data) {
        super();
        this.chartTitle = "Flip History";
        this.updateChart(data);
    }

    updateChart(data) {
        // Calculate percentages
        const total = data.heads + data.tails;
        const headsPercent = (data.heads / total) * 360;
        const tailsPercent = (data.tails / total) * 360;

        this.set('headsAngle', headsPercent);
        this.set('tailsAngle', tailsPercent);
    }
}