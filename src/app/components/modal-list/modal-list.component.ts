import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListTypeService } from '../../services/list-type.service';
import ListType from '../../models/list.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-list',
  templateUrl: './modal-list.component.html',
  styleUrl: './modal-list.component.css'
})
export class ModalListComponent implements OnInit{
  @Input() isOpen!: boolean;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  isEmojiSelectorOpen: boolean = false;
  newListType!: ListType;
  formGroup!: FormGroup;

  constructor(
    private listTypeService: ListTypeService
  ) { }

  ngOnInit(): void {
    this.newListType = this.listTypeService.getNewListType();

    //Creation of form validation
    this.formGroup = new FormGroup({
      titleList: new FormControl(this.newListType.titleList, [Validators.required]),
      emomi: new FormControl(this.newListType.emoji, [Validators.required])
    })
  }

  closeModal() {
    this.isOpen = !this.isOpen;
    if (this.isEmojiSelectorOpen) {
      this.isEmojiSelectorOpen = !this.isEmojiSelectorOpen;
    }
    this.newListType = this.listTypeService.getNewListType();
    this.closeModalEvent.emit(this.isOpen);
  }

  openEmojiSelector() {
    this.isEmojiSelectorOpen = !this.isEmojiSelectorOpen;
  }

  addEmoji(emojiSelected: any) {
    this.isEmojiSelectorOpen = !this.isEmojiSelectorOpen;
    this.newListType.emoji = emojiSelected.emoji.native;
  }
}
