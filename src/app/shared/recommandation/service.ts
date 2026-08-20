import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes the service available application-wide
})
export class TaskService {
  // Example shared state:
  private tasksSubject = new BehaviorSubject<Task[]>([]); // Using BehaviorSubject to hold tasks

  tasks$ = this.tasksSubject.asObservable(); // Expose as Observable for components

  // Method to add a task
  addTask(task: Task) {
    const tasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...tasks, task]);
  }

  // Additional methods (removeTask, updateTask, etc.) can go here
}

interface Task {
  id: number;
  name: string;
  description: string;
  recommendation: string;
  imageUrl?: string;
}
