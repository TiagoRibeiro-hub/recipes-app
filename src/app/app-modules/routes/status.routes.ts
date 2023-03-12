import { Route } from '@angular/router';
import { appRoute } from '@constants/routes';

export const STATUS_ROUTES: Route[] = [
    {
        path: appRoute.NOT_AUTHORIZED,
        loadComponent: () => import('../status/not-authorized/not-authorized.component').then(c => c.NotAuthorizedComponent)
    },
    {
        path: appRoute.NOT_FOUND,
        loadComponent: () => import('../status/not-found/not-found.component').then(c => c.NotFoundComponent)
    }
]