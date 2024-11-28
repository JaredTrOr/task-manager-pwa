import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import TaskToDo from '../../models/task.interface';
import { ListTypeService } from '../../services/list-type.service';

@Component({
  selector: 'app-selected-list-type',
  templateUrl: './selected-list-type.component.html',
  styleUrl: './selected-list-type.component.css'
})
export class SelectedListTypeComponent {

  tasks: TaskToDo[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    public listTypeService: ListTypeService
  ) { }

  ngOnInit(): void {
    const listTypeId = this.route.snapshot.paramMap.get('listTypeId');
    this.taskService.getTaskByListType(listTypeId!).subscribe({
      next: response => {
        this.tasks = response.data!;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  onSelectTaskEvent(task: TaskToDo) {
    
  }
  
}
