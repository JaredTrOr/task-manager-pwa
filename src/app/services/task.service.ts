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

  updateTask(task: TaskToDo) {
    return this.http.put<ApiResponse<TaskToDo>>(`${this.URL}/update-task`, task);
  }

  deleteTask(id: string) {
    return this.http.delete<ApiResponse<TaskToDo>>(`${this.URL}/delete-task/${id}`);
  }

  deleteCompletedTasks() {
    return this.http.delete<ApiResponse<TaskToDo>>(`${this.URL}/delete-completed-tasks`);
  }

  // Handle task array
  pushTask(task: TaskToDo) {
    this.taskArray.push(task);
  }

  removeTask(index: number) {
    this.taskArray.splice(index, 1);
  }

  removeCompletedTasks() {
    this.taskArray = this.taskArray.filter(task => !task.checked)
  }

  getTaskArray(): TaskToDo[] {
    return this.taskArray;
  }

  getUncheckedTasks(): TaskToDo[] {
    return this.taskArray.filter(task => !task.checked);
  }

  getCheckedTasks(): TaskToDo[] {
    return this.taskArray.filter(task => task.checked);
  }

  getAmountOfTasksToDo(): number {
    return this.taskArray.reduce((acc, task) => task.checked ? acc : acc + 1, 0);
  }

  getAmountOfCompletedTasks(): number {
    return this.taskArray.reduce((acc, task) => task.checked ? acc + 1 : acc, 0);
  }

  setTaskArray(taskArray: TaskToDo[]) {
    this.taskArray = taskArray;
  }
}
