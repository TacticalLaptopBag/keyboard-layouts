import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from "../../lesson/lesson";
import { WithBaseUrlPipe } from "../../../pipes/with-base-url-pipe";

@Component({
    selector: 'app-dvorak-one-handed',
    imports: [Lesson, WithBaseUrlPipe],
    templateUrl: './dvorak-one-handed.html',
    styleUrl: './dvorak-one-handed.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DvorakOneHanded {
    @Input()
    public imgUrls!: string[]
}
