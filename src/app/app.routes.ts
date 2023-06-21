import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'sign-up', loadComponent: () => import('./sign-up/sign-up.component').then(mod => mod.SignUpComponent)
  },
  {
    path: 'confirmation', loadComponent: () => import('./confirmation/confirmation.component').then(mod => mod.ConfirmationComponent)
  },
  {
    path: '',
    redirectTo: '/sign-up',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/sign-up',
  }
];
