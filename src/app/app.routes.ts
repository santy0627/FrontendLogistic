import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Remesas } from './pages/remesas/remesas';
import { authGuard } from './guards/auth';
import { Camiones } from './pages/camiones/camiones';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'remesas',
    component: Remesas,
    canActivate: [authGuard],
  },
  {
    path: 'camiones',
    component: Camiones,
    canActivate: [authGuard],
  },
];
