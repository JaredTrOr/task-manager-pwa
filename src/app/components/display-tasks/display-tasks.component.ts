import { Component, Input } from '@angular/core';
import TaskToDo from '../../models/task.interface';
import { convertDateToString } from '../../utils/date-converter';
import ListType from '../../models/list.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-display-tasks',
  templateUrl: './display-tasks.component.html',
  styleUrl: './display-tasks.component.css'
})
export class DisplayTasksComponent {
  @Input() tasks!: TaskToDo[];
  @Input() listTypesArray!: ListType[];
  @Input() completed!: boolean;
  convertDateToString = convertDateToString;

  constructor(
    private taskService: TaskService
  ) {}

  completeTask(task: TaskToDo) {
    setTimeout(() => {
      task.checked = !task.checked;
      this.taskService.updateTask(task).subscribe({
        next: () => {
          console.log('Task updated');
        },
        error: (error) => {
          console.log('Error updating task', error);
        }
      })
    }, 300);
  }

  getListType(listTypeId: string): string {

    if (listTypeId === 'general') return 'General';

    const listType = this.listTypesArray.find(listType => listType._id === listTypeId);
    return `${listType?.emoji} ${listType?.title}`;
  }

  removeCompletedTasks() {
    this.taskService.removeCompletedTasks()
    this.taskService.deleteCompletedTasks().subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  removeTask(index: number) {
    const task = this.taskService.getTaskArray()[index];
    this.taskService.removeTask(index);
    this.taskService.deleteTask(task._id!).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
