import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ListTypeService } from '../../services/list-type.service';
import TaskToDo from '../../models/task.interface';

@Component({
  selector: 'app-tasks-to-do',
  templateUrl: './tasks-to-do.component.html',
  styleUrl: './tasks-to-do.component.css'
})
export class TasksToDoComponent implements OnInit{

  isCreateTaskOpen: boolean = false;
  selectedTask!: TaskToDo;

  constructor(
    public taskService: TaskService,
    public listTypesService: ListTypeService
  ) { }

  ngOnInit(): void {
    // Get tasks
    this.taskService.getTasks().subscribe({
      next: response => {
        if (response.data) {
          this.taskService.setTaskArray(response.data);
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  openCreateTask() {
    this.isCreateTaskOpen = true;
  }

  closeCreateTask(toggledValue : boolean) {
    this.isCreateTaskOpen = toggledValue;
  }

  onSelectTaskEvent(task: TaskToDo) {
    this.selectedTask = {...task};
    this.isCreateTaskOpen = true;
  }

}
