import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from "../../lesson/lesson";
import { environment } from '../../../environments/environment';

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
    public baseUrl = environment.baseUrl
}
