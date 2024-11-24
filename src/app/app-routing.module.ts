import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './services/auth.guard';
import { TasksToDoComponent } from './pages/tasks-to-do/tasks-to-do.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { SelectedListTypeComponent } from './pages/selected-list-type/selected-list-type.component';
import { TasksCompletedComponent } from './pages/tasks-completed/tasks-completed.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full', // Ensures the redirect only happens for the root path
  },
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
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Perfil'
      },
      {
        path: 'home',
        component: TasksToDoComponent,
        title: 'Home'
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        title: 'Notificaciones'
      },
      {
        path: 'list-types/:listTypeId',
        component: SelectedListTypeComponent,
        title: 'Listado'
      },
      {
        path: 'completed-tasks',
        component: TasksCompletedComponent,
        title: 'Tareas completadas'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login' // --> Page not found
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
