import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ListTypeService } from '../../services/list-type.service';

@Component({
  selector: 'app-tasks-completed',
  templateUrl: './tasks-completed.component.html',
  styleUrl: './tasks-completed.component.css'
})
export class TasksCompletedComponent implements OnInit {

  constructor(
    public taskService: TaskService,
    public listTypeService: ListTypeService
  ) { }

  ngOnInit(): void {
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
}
