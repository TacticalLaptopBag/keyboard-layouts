import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavLink } from '../../models/navlink.interface';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './header.html',
    styleUrl: './header.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
    @Input()
    public navLinks: NavLink[] = [
        {
            title: 'Home',
            href: '/',
        },
        {
            title: 'Left-handed Dvorak',
            href: '/dvorak-left',
        },
        {
            title: 'Right-handed Dvorak',
            href: '/dvorak-right',
        },
    ]
}
