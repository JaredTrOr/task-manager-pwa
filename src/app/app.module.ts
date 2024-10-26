import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ModalListComponent } from './components/modal-list/modal-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DisplayTasksComponent } from './components/display-tasks/display-tasks.component';
import { TasksToDoComponent } from './pages/tasks-to-do/tasks-to-do.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { TasksCompletedComponent } from './pages/tasks-completed/tasks-completed.component';
import { SelectedListTypeComponent } from './pages/selected-list-type/selected-list-type.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SidebarComponent,
    HomeComponent,
    ModalListComponent,
    LoadingComponent,
    CreateTaskComponent,
    DisplayTasksComponent,
    TasksToDoComponent,
    NotificationsComponent,
    TasksCompletedComponent,
    SelectedListTypeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PickerComponent,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
