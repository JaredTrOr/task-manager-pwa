import { Component, HostListener } from '@angular/core';
import TaskToDo from '../../models/task.interface';
import ListType from '../../models/list.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isSidebarOpen = true;
  isResponsive = false;

  taskList: TaskToDo[] = [];
  listsTypes: ListType[] = [];

  emoji: string = '';

  constructor() {
    this.checkScreenSize();
  }

  addEmoji(event: any) {

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isResponsive = window.innerWidth <= 768; 

    if (this.isResponsive && this.isSidebarOpen) {
      this.isSidebarOpen = false;
    }

    if (!this.isResponsive && !this.isSidebarOpen) {
      this.isSidebarOpen = true;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
