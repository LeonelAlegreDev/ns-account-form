import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },

    {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    }
];
