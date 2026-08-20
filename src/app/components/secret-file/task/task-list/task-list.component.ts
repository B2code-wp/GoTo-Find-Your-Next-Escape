import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject
} from '@angular/core';

import { DatePipe } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TasksService } from '../tasks.service';

import { Task } from './task.list.model(interface)';

@Component({
  selector: 'app-task-list',
  standalone: true,

  imports: [
    DatePipe,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],

  templateUrl: './task-list.component.html',

  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  @Input({ required: true })
  task!: Task;

  @Output()
  complete = new EventEmitter<string>();

  private tasksService = inject(TasksService);

  onCompleteTask(): void {

    this.tasksService.completeTask(this.task.id);

    this.complete.emit(this.task.id);
  }
}
