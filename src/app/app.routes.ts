import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DvorakOneHanded } from './pages/dvorak-one-handed/dvorak-one-handed';
import { environment } from '../environments/environment';

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
                `${environment.baseUrl}/dvorak-one-handed/left-img/DLH1.jpg`,
                `${environment.baseUrl}/dvorak-one-handed/left-img/DLH2.jpg`,
                `${environment.baseUrl}/dvorak-one-handed/left-img/DLH3.jpg`,
                `${environment.baseUrl}/dvorak-one-handed/left-img/DLH4.jpg`,
                `${environment.baseUrl}/dvorak-one-handed/left-img/DLH5.jpg`,
            ],
        },
    },
    {
        path: 'dvorak-right',
        component: DvorakOneHanded,
        data: {
            imgUrls: [
                `${environment.baseUrl}/dvorak-one-handed/right-img/DRH.jpg`,
                `${environment.baseUrl}/dvorak-one-handed/right-img/DRH.jpg`,
                `${environment.baseUrl}/dvorak-one-handed/right-img/DRH.jpg`,
                `${environment.baseUrl}/dvorak-one-handed/right-img/DRH.jpg`,
                `${environment.baseUrl}/dvorak-one-handed/right-img/DRH.jpg`,
            ],
        },
    },
];
