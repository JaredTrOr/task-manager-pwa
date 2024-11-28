import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ListTypeService } from '../../services/list-type.service';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from '../../services/push-notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public readonly VAPID_PUBLIC_KEY = 'BH_vBvrsoRAudT4bvRFXNeBcLgKCBpv6QgEmM9a_ygGgrjhid6SisWgYTCOR7LVqbq2l7CtACFlF6k-xo6fBF18';

  // Component events
  isSidebarOpen = true;
  isResponsive = false;
  isModalOpen = false;

  constructor(
    public userService: UserService,
    public listTypesService: ListTypeService,
    private swPush: SwPush,
    private pushNotificationService: PushNotificationService
  ) {
    this.checkScreenSize();
    this.subscribeToNotifications();
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
          this.userService.setUserInfo(response.data);
        }
      },
      error: err => {
        console.log(err);
      }
    });

  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      const token = JSON.parse(JSON.stringify(sub));
      token.userId = this.userService.getUserInfoProvider()._id;
      
      this.pushNotificationService.saveSubscription(token).subscribe({
        next: response => {
          console.log(response);
        },
        error: err => {
          console.error(err);
        }
      })
    })  
    .catch(err => {
      console.error('No se dieron los permisos necesarios', err);
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
