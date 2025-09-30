import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CluMapViewComponent } from './modules/clu-map/components/clu-map-view/clu-map-view.component';
import { CluMapLocationComponent } from './modules/clu-map/components/clu-map-location/clu-map-location.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login' 
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'layout',
        component: LayoutComponent,
        children:[
            {
                path: 'user',
                component: CluMapLocationComponent
            },
            {
                path: '',
                component: CluMapViewComponent
            }
        ]
    }
];
