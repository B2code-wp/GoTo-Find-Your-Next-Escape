import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

interface Task {
  title: string;
  summary?: string;
  dueDate?: string;
}


@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent implements OnInit {
  @Input() userId: string = '';
  @Output() taskCreated = new EventEmitter<Task>();
  @Output() closed = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  // =========================
  // FORM BINDING FIELDS
  // =========================
  enteredTitle: string = '';
  enteredSummary: string = '';
  enteredDueDate: string = '';

  // =========================
  // TASK STORAGE
  // =========================
  tasks: Task[] = [];

  ngOnInit(): void {
    // Component initialization if needed
  }

  // =========================
  // SUBMIT TASK
  // =========================
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.form?.markAllAsTouched();
      return;
    }

    const newTask: Task = {
      title: this.enteredTitle.trim(),
      summary: this.enteredSummary?.trim() || '',
      dueDate: this.enteredDueDate || ''
    };

    this.tasks.push(newTask);
    this.taskCreated.emit(newTask);

    console.log('Task created:', newTask);

    this.resetForm(form);
    this.onCancel();
  }

  // =========================
  // RESET FORM
  // =========================
  private resetForm(form?: NgForm): void {
    this.enteredTitle = '';
    this.enteredSummary = '';
    this.enteredDueDate = '';

    if (form) {
      form.resetForm();
    }
  }

  // =========================
  // CLOSE MODAL
  // =========================
  onCancel(): void {
    this.cancel.emit();
    this.closed.emit();
    console.log('Modal closed');
  }

}
