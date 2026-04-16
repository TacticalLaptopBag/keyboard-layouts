import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson, LessonTitle, LessonSubtitle } from "../../lesson/lesson";
import { WithBaseUrlPipe } from "../../../pipes/with-base-url-pipe";

@Component({
    selector: 'app-dvorak-one-handed',
    imports: [Lesson, WithBaseUrlPipe, LessonTitle, LessonSubtitle],
    templateUrl: './dvorak-one-handed.html',
    styleUrl: './dvorak-one-handed.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DvorakOneHanded {
    @Input()
    public imgUrls!: string[]
}
