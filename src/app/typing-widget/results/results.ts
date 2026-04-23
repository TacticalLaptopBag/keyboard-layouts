import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ResultsData } from '../../../models/results-data.interface';

@Component({
    selector: 'app-results',
    imports: [],
    templateUrl: './results.html',
    styleUrl: './results.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Results {
    @Input()
    public data!: ResultsData

    public getWPM(): string {
        const wpm = (this.data.lettersTyped / 5) / this.data.minutesElapsed
        return wpm.toFixed(1)
    }
}
