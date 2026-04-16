import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from "../../lesson/lesson";

@Component({
    selector: 'app-dvorak-one-handed',
    imports: [Lesson],
    templateUrl: './dvorak-one-handed.html',
    styleUrl: './dvorak-one-handed.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DvorakOneHanded {
    @Input()
    public imgUrls!: string[]
}
