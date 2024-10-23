import { Injectable } from '@angular/core';
import ApiResponse from '../models/api.interface';
import TaskToDo from '../models/task.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL: string = 'http://localhost:3000/task';
  taskArray: TaskToDo[] = [];

  constructor(
    private http: HttpClient
  ) { }

  // Http requests
  getTasks() {
    return this.http.get<ApiResponse<TaskToDo[]>>(`${this.URL}/get-tasks`);
  }

  createTask(task: TaskToDo) {
    return this.http.post<ApiResponse<TaskToDo>>(`${this.URL}/create-task`, task);
  }

  deleteTask(id: string) {
    return this.http.delete<ApiResponse<null>>(`${this.URL}/delete-list-type/${id}`);
  }

  // Handle task array
  pushTask(task: TaskToDo) {
    this.taskArray.push(task);
  }

  removeTask(index: number) {
    this.taskArray.splice(index, 1);
  }

  getTaskArray(): TaskToDo[] {
    return this.taskArray;
  }

  getAmountOfTasksToDo(): number {
    return this.taskArray.reduce((acc, task) => task.checked ? acc : acc + 1, 0);
  }

  setTaskArray(taskArray: TaskToDo[]) {
    this.taskArray = taskArray;
  }
}
