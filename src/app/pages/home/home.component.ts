import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ListTypeService } from '../../services/list-type.service';
import { TaskService } from '../../services/task.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  // Component events
  isSidebarOpen = true;
  isResponsive = false;
  isModalOpen = false;
  userInfo?: User;

  constructor(
    private userService: UserService,
    public listTypesService: ListTypeService
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {

    // Get list types
    this.listTypesService.getListsTypes().subscribe({
      next: response => {
        if (response.data) {
          this.listTypesService.setListTypeArray(response.data);
        }
      },
      error: err => {
        console.log(err);
      }
    });

    // Get user info
    this.userService.getUserInfo().subscribe({
      next: response => {
        if (response.data) {
          this.userInfo = response.data;
        }
      },
      error: err => {
        console.log(err);
      }
    });

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
