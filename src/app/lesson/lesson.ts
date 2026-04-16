import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypingWidget } from "../typing-widget/typing-widget";

@Component({
    selector: 'app-lesson',
    imports: [TypingWidget],
    templateUrl: './lesson.html',
    styleUrl: './lesson.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lesson {
    @Input()
    public title!: string
    @Input()
    public subtitle!: string
    @Input()
    public imgUrl!: string
    @Input()
    public imgAlt!: string
    @Input()
    public wordListUrl!: string
}
