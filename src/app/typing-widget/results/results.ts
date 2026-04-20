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
        // TODO: Something is wrong about this calculation.
        // I type at abt 100 WPM, but even on standard Dvorak I'm getting like 40 WPM in the all letters tests
        return (this.data.correctWords + this.data.incorrectWords) / this.data.minutesElapsed
    }
}
