import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

export const appRoutes: Routes = [
    {
        path: 'task',
        loadChildren: () => import('./pages/task/task.module').then(m => m.TaskModule),
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    },
    {
        path: '**',
        redirectTo: 'task'
    }
];

export function onRouterError(err): boolean {
    console.log(err);
    return false;
}

export const routerConfig = {
    useHash: true,
    errorHandler: onRouterError
};

export const APP_ROUTES: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes, routerConfig);
