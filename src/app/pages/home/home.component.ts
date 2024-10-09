import { Component, HostListener, NgZone } from '@angular/core';
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
  isModalOpen = false;

  taskList: TaskToDo[] = [];
  listsTypes: ListType[] = [];

  constructor() {
    this.checkScreenSize();
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

  openModal(toggledValue : boolean) {
    this.isModalOpen = toggledValue;
  }

  closeModal(toggledValue : boolean) {
    this.isModalOpen = toggledValue;
  }
}
