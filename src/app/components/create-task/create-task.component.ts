import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.interface';
import ListType from '../../models/list.interface';
import { TaskService } from '../../services/task.service';
import TaskToDo from '../../models/task.interface';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit, OnChanges {

  @Input() isOpen!: boolean;
  @Input() listTypesArray!: ListType[];
  @Input() selectedTask!: TaskToDo | null;
  @Output() closeCreateTaskEvent = new EventEmitter<boolean>();

  formGroup!: FormGroup;
  createReminder: string = 'yes';
  tipoUnidad: string[] = ['minutos', 'horas', 'días'];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.formSetup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTask'] && changes['selectedTask'].currentValue) {
      console.log(changes['selectedTask'].currentValue);
      this.populateForm(changes['selectedTask'].currentValue);
    }
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

  populateForm(task: TaskToDo): void {
    this.formGroup.patchValue({
      title: task.title,
      description: task.description,
      deadline: new Date(task.deadline).toISOString().slice(0, 10),
      listType: task.listType,
      createReminder: task.reminder ? 'yes' : 'no',
      reminderAmount: task.reminder ? task.reminder.amount : '',
      reminderUnitType: task.reminder ? task.reminder.unitTime : 'minutos',
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

    const newTask : TaskToDo = {
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

    if (this.selectedTask) {
      newTask._id = this.selectedTask._id;
    }

    this.taskService.createOrUpdateTask(newTask).subscribe({
      next: (response) => {
        if (response.success) {
          console.log(response);
          if (this.selectedTask) {
            this.taskService.updateTaskArray(response.data!);
          } else {
            this.taskService.pushTask(response.data!);
          }

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
    this.selectedTask = null;
    this.isOpen = !this.isOpen;
    this.formSetup();
    this.closeCreateTaskEvent.emit(this.isOpen);
  }
}
