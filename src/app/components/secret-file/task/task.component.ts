import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { IonicModule } from '@ionic/angular';
import { IonHeader } from '@ionic/angular/standalone';

import { NewTaskComponent } from './new-task/new-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { Tasks } from './ArrayInfo-tasks';

interface Task {
  id: string;
  title: string;
  summary: string;
  dueDate: string;
  userId: string;
}

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,

    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,

    IonicModule,
    IonHeader,

    FooterComponent,
    TaskListComponent,
    NewTaskComponent
  ]
})
export class TaskComponent {

  /* UI */
  isAddingTask = false;

  /* USER */
  name = 'Itu';
  userId = 'user-001';

  /* DATA */
  tasks: Task[] = Tasks;

  /* MODAL */
  onStartAddTask(): void {
    this.isAddingTask = true;
  }

  onCancelTask(): void {
    this.isAddingTask = false;
  }

  /* ADD TASK */
  onTaskCreated(task: Task): void {
    this.tasks = [...this.tasks, task];
    this.isAddingTask = false;
  }

  /* COMPLETE TASK */
  onCompleteTask(taskId: string): void {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
  }

  /* FILTERED VIEW */
  get selectedUserTask(): Task[] {
    return this.tasks;
  }

  /* SCROLL */
  scrollToTasks(): void {
    document.getElementById('tasks')?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}