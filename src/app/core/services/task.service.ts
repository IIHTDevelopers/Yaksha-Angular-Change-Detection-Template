import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Initialize tasks array with some sample tasks
  private tasks: Task[] = [
    { id: 1, name: 'Task 1', status: 'Pending' },
    { id: 2, name: 'Task 2', status: 'In Progress' },
  ];

  // Create a BehaviorSubject to hold tasks, which will emit the current state of tasks
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);

  constructor() { }

  // Observable to get the current list of tasks
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  // Add a new task to the list
  addTask(task: Task): void {
    this.tasks.push(task);
    // Emit the new task array to update the subscribers
    this.tasksSubject.next([...this.tasks]); // Create a new array reference to trigger change detection
  }

  // Update the status of an existing task
  updateTaskStatus(id: number, status: 'Pending' | 'In Progress' | 'Completed'): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      // Emit the updated task array
      this.tasksSubject.next([...this.tasks]); // Trigger change detection
    }
  }

  // Delete a task by its ID
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    // Emit the updated task array after deletion
    this.tasksSubject.next([...this.tasks]); // Trigger change detection
  }
}
