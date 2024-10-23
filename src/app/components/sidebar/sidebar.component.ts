import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { ListTypeService } from '../../services/list-type.service';
import ListType from '../../models/list.interface';
import { User } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarOpen!:boolean;
  @Input() isModalOpen!: boolean;
  @Output() openModalEvent = new EventEmitter<boolean>();

  // Http info
  listTypeArray: ListType[] = [];
  userInfo?: User;

  constructor(
    public listTypeService: ListTypeService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.listTypeService.getListsTypes().subscribe({
      next: response => {
        if (response.data) {
          this.listTypeService.setListTypeArray(response.data);
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
    this.openModalEvent.emit(this.isSidebarOpen);
  }

  logout() {
    this.authService.logout();
  }

  deleteList(index: number) {
    // [element1, element2] [0]
    const element = this.listTypeService.getListTypeArray()[index];
    const listId = element._id;

    //Borro del arreglo
    this.listTypeService.removeListType(index);

    //Borrar de la BD
    this.listTypeService.deleteListType(listId!).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    })
    
  }
}
