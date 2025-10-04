import { Routes } from '@angular/router';
import { BeersPage } from './features/beers/beers.page';
import { beersResolver } from './features/beers/beers-resolver';

export const routes: Routes = [
  {
    path: '',
    component: BeersPage,
    pathMatch: 'full',
    resolve: { beers: beersResolver },
  },
];
