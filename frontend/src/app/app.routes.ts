import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './services/session-guard/session.guard';
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
        canActivate: [AuthGuard],
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
