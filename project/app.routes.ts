import { Routes } from '@angular/router';
import { BeersPage } from '@features/beers/beers.page';

export const routes: Routes = [
  {
    path: '',
    component: BeersPage,
    pathMatch: 'full',
  },
];
