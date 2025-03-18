import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush  // Use OnPush strategy
})
export class TaskItemComponent {
  task!: Task;  // Input property for task data

  constructor(private taskService: TaskService) { }

  // Change the status of the task
  toggleStatus(): void {
  }
}
