import { Component } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  taskName: string = '';  // User input for task name
  status: string = '';  // Default task status

  constructor(private taskService: TaskService) { }

  // Handle form submission to add a task
  onSubmit(): void {
  }
}
