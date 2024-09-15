import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/app/home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('@/app/not-found/not-found.component').then((m) => m.NotFoundComponent),
    pathMatch: 'full',
  },
];
