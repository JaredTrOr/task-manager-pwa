import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.interface';
import { ListTypeService } from '../../services/list-type.service';
import ListType from '../../models/list.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  @Input() isOpen!: boolean;
  @Input() listTypesArray!: ListType[];
  @Output() closeCreateTaskEvent = new EventEmitter<boolean>();

  formGroup!: FormGroup;
  createReminder: string = 'yes';
  tipoUnidad: string[] = ['minutos', 'horas', 'días'];

  // Http data
  userInfo!: User;

  constructor(
    private formBuilder: FormBuilder,
    private listTypeService: ListTypeService
  ) { }

  ngOnInit(): void {
    this.formSetup();
  }

  formSetup() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      listType: ['ninguno', Validators.required],
      createReminder: ['yes', Validators.required],
      reminderAmount: [''],
      reminderUnitType: ['minutos'],
    });
  }

  onSubmit(): void {

    const reminderAmountControl = this.formGroup.get('reminderAmount');

    if (this.formGroup.get('createReminder')?.value === 'yes') 
      reminderAmountControl?.setValidators([Validators.required]);
    else 
      reminderAmountControl?.clearValidators();

    reminderAmountControl?.updateValueAndValidity();

    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    
    console.log(this.formGroup.value);
  }

  closeCreateTaskModal() {
    this.isOpen = !this.isOpen;
    this.formSetup();
    this.closeCreateTaskEvent.emit(this.isOpen);
  }
}
