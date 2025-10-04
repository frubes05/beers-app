import { Routes } from '@angular/router';
import { BeersPage } from '../pages/beers/beers.page';
import { beersResolver } from './resolvers/beersResolver';

export const routes: Routes = [
  {
    path: '',
    component: BeersPage,
    pathMatch: 'full',
    resolve: { beers: beersResolver },
  },
];
