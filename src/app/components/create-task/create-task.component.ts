import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.interface';
import { ListTypeService } from '../../services/list-type.service';
import ListType from '../../models/list.interface';
import { TaskService } from '../../services/task.service';
import TaskToDo from '../../models/task.interface';

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
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.formSetup();
  }

  formSetup() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      listType: ['general', Validators.required],
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

    const newTask :TaskToDo = {
      title: this.formGroup.get('title')?.value,
      description: this.formGroup.get('description')?.value,
      deadline: this.formGroup.get('deadline')?.value,
      listType: this.formGroup.get('listType')?.value,
      checked: false
    }

    if (this.formGroup.get('createReminder')?.value === 'yes') {
      newTask.reminder = {
        unitTime: this.formGroup.get('reminderUnitType')?.value,
        amount: this.formGroup.get('reminderAmount')?.value
      }
    }

    this.taskService.createTask(newTask).subscribe({
      next: (response) => {
        if (response.success) {
          this.taskService.pushTask(response.data!);
          this.closeCreateTaskModal();
          return;
        }

        console.log(response.message);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  closeCreateTaskModal() {
    this.isOpen = !this.isOpen;
    this.formSetup();
    this.closeCreateTaskEvent.emit(this.isOpen);
  }
}
