import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListTypeService } from '../../services/list-type.service';
import ListType from '../../models/list.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  listForm!: FormGroup;

  constructor(
    private listTypeService: ListTypeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.newListType = this.listTypeService.getNewListType();

    this.listForm = this.formBuilder.group({
      titleList: ['', Validators.required],
    });
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

  createListType() {

    if (!this.listForm.valid) {
      this.listForm.markAllAsTouched();
      return;
    }

    this.newListType.titleList = this.listForm.value.titleList;
    this.listTypeService.createListType(this.newListType);
    this.closeModal();
  }
}
