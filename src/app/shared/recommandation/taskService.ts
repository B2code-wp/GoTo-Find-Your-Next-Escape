import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[] = [];

  addTask(task: Task): void {
    this.tasks.push(task);
    console.log('Task added:', task);
  }

  getTasks(): Task[] {
    return this.tasks;
  }
}
