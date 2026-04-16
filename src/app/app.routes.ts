import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DvorakOneHanded } from './pages/dvorak-one-handed/dvorak-one-handed';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'dvorak-left',
        component: DvorakOneHanded,
        data: {
            imgUrls: [
                '/dvorak-one-handed/left-img/DLH1.jpg',
                '/dvorak-one-handed/left-img/DLH2.jpg',
                '/dvorak-one-handed/left-img/DLH3.jpg',
                '/dvorak-one-handed/left-img/DLH4.jpg',
                '/dvorak-one-handed/left-img/DLH5.jpg',
            ],
        },
    },
    {
        path: 'dvorak-right',
        component: DvorakOneHanded,
        data: {
            imgUrls: [
                '/dvorak-one-handed/right-img/DRH.jpg',
                '/dvorak-one-handed/right-img/DRH.jpg',
                '/dvorak-one-handed/right-img/DRH.jpg',
                '/dvorak-one-handed/right-img/DRH.jpg',
                '/dvorak-one-handed/right-img/DRH.jpg',
            ],
        },
    },
];
