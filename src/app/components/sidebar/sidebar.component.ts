import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { ListTypeService } from '../../services/list-type.service';
import ListType from '../../models/list.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarOpen!:boolean;
  @Input() isModalOpen!: boolean;
  @Output() openModalEvent = new EventEmitter<boolean>();
  listTypeArray: ListType[] = [];

  constructor(
    private listTypeService: ListTypeService
  ) {}

  ngOnInit(): void {
    this.listTypeArray = this.listTypeService.getListType();
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
    this.openModalEvent.emit(this.isSidebarOpen);
  }
}
