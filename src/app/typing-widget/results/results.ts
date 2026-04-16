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

    public getWPM(): number {
        return (this.data.correctWords + this.data.incorrectWords) / this.data.minutesElapsed
    }
}
