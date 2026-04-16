import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from "../../lesson/lesson";
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-dvorak-one-handed',
    imports: [Lesson, RouterLink],
    templateUrl: './dvorak-one-handed.html',
    styleUrl: './dvorak-one-handed.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DvorakOneHanded {
    @Input()
    public imgUrls!: string[]
    public baseUrl = environment.baseUrl
}
