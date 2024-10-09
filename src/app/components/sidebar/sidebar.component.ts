import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isSidebarOpen!:boolean;
  @Input() isModalOpen!: boolean;
  @Output() openModalEvent = new EventEmitter<boolean>();

  openModal() {
    this.isModalOpen = !this.isModalOpen;
    this.openModalEvent.emit(this.isSidebarOpen);
  }
}
