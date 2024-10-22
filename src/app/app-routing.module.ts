import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './services/auth.guard';
import { CreateTaskComponent } from './pages/create-task/create-task.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Inicio sesión'
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Registro'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
    canActivate: [authGuard]
  },
  {
    path: 'create-task',
    component: CreateTaskComponent,
    title: 'Crear tarea',
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
